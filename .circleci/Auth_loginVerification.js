/*
API Name: Login Verification API 
This API fetches the authorization token based on the user email.
Performnace Testing user & Selenium users can directly use this token in the request header of the APIs that requires authorization.
*/

import http from 'k6/http';
//"baseurl": "https://dev.albertinvent.com/api/v2/Auth/loginVerification?userIpAddress=106.198.4.243",
//import {check, sleep} from 'k6';

    const config = JSON.parse(open('config.json'));  //config.json file location and parsing the json variables


    const url = `${config.env.AuthURL}`;
    
    const Orginurl = `${config.HeaderParam.Orgin}`; 
  
    
    const duration1 = `${config.scenario.duration_step1}`;
    const duration2 = `${config.scenario.duration_step2}`;
    const duration3 = `${config.scenario.duration_step3}`;
    const target1 = `${config.scenario.target_step1}`;
    const target2 = `${config.scenario.target_step2}`;
    const target3 = `${config.scenario.target_step3}`;
    const thresholds_passfail1 = `${config.thresholds1.thresholds_passfail}`;
    const handshake_passfail1 = `${config.thresholds1.handshake_passfail}`;
    const VUser = `${config.scenario.VirtualUser}`;
    const iter = `${config.scenario.calls}`;
    

export let options = {
  
      vus: `${VUser}`,
      iterations: `${iter}`,
      //duration: '300s',
      
      /*
    stages: [
      { duration: `${duration1}`, target: `${target1}` }, // Ex...simulate ramp-up of traffic from 1 to 'X' users over 'X' minutes.
      { duration: `${duration2}`, target: `${target2}` }, // Ex....stay at 'X' users for 'X' minutes
      { duration: `${duration3}`, target: `${target3}`}, // Ex....ramp-down to 0 users
    ],

    */

    thresholds: {
      http_req_duration: [`${thresholds_passfail1}`], // 95% of requests must complete below 1 s ( SLA - ???????????)
      'loginVerification_Loaded Successfully': [`${thresholds_passfail1}`], // 95% of requests must complete below 1s
      http_req_tls_handshaking:[`${handshake_passfail1}`], // 95% of requests must complete below 1 s ( SLA - ???????????)
      'tlshandshakeloadedSuccessfully': [`${handshake_passfail1}`], 
    },
  
   };


export default function ()

{

  var param = {
    headers: {
      'Content-Type': 'application/json',
      'Origin': `${Orginurl}`,
      'x-app-version': '39',
    },
  };


    var payload = JSON.stringify({
          
           "username": "vx&*9#ak23%qwhj1!$|selenium-tr@seleniumtest.com" 
    })
    

  var response = http.post( url, payload, param)

  //console.log(`${JSON.stringify(param)}`)

  // let body = JSON.parse(response.body)
  // console.log(`${JSON.stringify(body)}`) // Print the response body


}
