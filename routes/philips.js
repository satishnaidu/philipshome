#! philips.js
var express = require('express');
var router = express.Router();
let huejay = require('huejay');
let fs = require('fs')

/* GET discover bridge */
router.get('/discover', function(req, res, next) {
	huejay.discover()
	  .then(bridges => {
	    for (let bridge of bridges) {
	      console.log(`Id: ${bridge.id}, IP: ${bridge.ip}`);
	    }
	  })
	  .catch(error => {
	    console.log(`An error occurred: ${error.message}`);
	  });
  res.send('respond with a resource');
});


/* GET discover bridge */
router.get('/users', function(req, res, next) {
	 console.log('Attempting to create user....');
    console.log('Make sure link button on bridge is pressed.....');

    let client = new huejay.Client({
      host:     '10.0.0.97',
      username: 'kkdGiCK6p2Jt865LzKPg9mIAhhHSoVxMjL0RjLkH'
    });
    console.log(client);


	client.users.getAll()
  .then(users => {
    for (let user of users) {
      console.log(`Username: ${user.username}`);
    }
  });

  client.bridge.ping()
	  .then(() => {
	    console.log('Successful connection');
	  })
	  .catch(error => {
	    console.log('Could not connect');
	  });

	  client.bridge.isAuthenticated()
	  .then(() => {
	    console.log('Successful authentication');
	  })
	  .catch(error => {
	    console.log('Could not authenticate');
	  });


    /*let user = new client.users.User;
    user.deviceType = 'customDevice';

    return client.users.create(user)
    .then(user => {
      console.log(`New user: ${user.username} created. With device type: ${user.deviceType}`);
      //Write user to creds file
      fs.writeFile("./creds", user.username, function(err) {
        if(err) {
          return console.log(err);
        }
      });
    })
    .catch(error => {
      if (error instanceof huejay.Error && error.type === 101) {
        return console.log(`Link button not pressed. Try again...`);
      }
      console.log(error.stack);
    })
    .catch(error => {
      console.log(error.message);
    });*/

  res.send('respond with a resource');
});


router.get('/lights', function(req, res, next) {

	let client = new huejay.Client({
      host:     '10.0.0.97',
      username: 'kkdGiCK6p2Jt865LzKPg9mIAhhHSoVxMjL0RjLkH'
    });

	client.lights.getAll()
  .then(lights => {
    for (let light of lights) {
      console.log(`Light [${light.id}]: ${light.name}`);
      console.log(`  Type:             ${light.type}`);
      console.log(`  Unique ID:        ${light.uniqueId}`);
      console.log(`  Manufacturer:     ${light.manufacturer}`);
      console.log(`  Model Id:         ${light.modelId}`);
      console.log('  Model:');
      console.log(`    Id:             ${light.model.id}`);
      console.log(`    Manufacturer:   ${light.model.manufacturer}`);
      console.log(`    Name:           ${light.model.name}`);
      console.log(`    Type:           ${light.model.type}`);
      console.log(`    Color Gamut:    ${light.model.colorGamut}`);
      console.log(`    Friends of Hue: ${light.model.friendsOfHue}`);
      console.log(`  Software Version: ${light.softwareVersion}`);
      console.log('  State:');
      console.log(`    On:         ${light.on}`);
      console.log(`    Reachable:  ${light.reachable}`);
      console.log(`    Brightness: ${light.brightness}`);
      console.log(`    Color mode: ${light.colorMode}`);
      console.log(`    Hue:        ${light.hue}`);
      console.log(`    Saturation: ${light.saturation}`);
      console.log(`    X/Y:        ${light.xy[0]}, ${light.xy[1]}`);
      console.log(`    Color Temp: ${light.colorTemp}`);
      console.log(`    Alert:      ${light.alert}`);
      console.log(`    Effect:     ${light.effect}`);
      console.log();
    }
  });
  var message = {'status':200, 'message': 'Successful got all light bulb statuses '};
  res.send(message);
});

router.post('/lights/status', function(req, res, next) {
	var reqbody = req.body;
    var status = reqbody.status;
    var device = reqbody.device;

	console.log("changing the status of device "+ device + " status to "+status);
	let client = new huejay.Client({
      host:     '10.0.0.97',
      username: 'kkdGiCK6p2Jt865LzKPg9mIAhhHSoVxMjL0RjLkH'
    });

	client.lights.getAll()
	  .then(lights => {
	    for (let light of lights) {

	    	if(!status){
	    		light.on = status;
	    	}else{
		    	light.on = status;
		    	light.brightness     = 254;
				light.colorTemp      = 160;
				light.transitionTime = 0.5;
			
	    	}
	    	client.lights.save(light);
	    }
	  })
	  .catch(error => {
	    console.log('Something went wrong during change in lights status');
	    console.log(error.stack);
	    var message = {'status':500, 'message': error};
	  });
	  var message = {'status':200, 'message': 'Successful changed all bulbs state to '+status};
  	res.send(message);
});

router.get('/groups', function(req, res, next) {

	let client = new huejay.Client({
      host:     '10.0.0.97',
      username: 'kkdGiCK6p2Jt865LzKPg9mIAhhHSoVxMjL0RjLkH'
    });

	client.groups.getAll()
	  .then(groups => {
	    for (let group of groups) {
	      console.log(`Group [${group.id}]: ${group.name}`);
	      console.log(`  Type: ${group.type}`);
	      console.log(`  Class: ${group.class}`);
	      console.log('  Light Ids: ' + group.lightIds.join(', '));
	      console.log('  State:');
	      console.log(`    Any on:     ${group.anyOn}`);
	      console.log(`    All on:     ${group.allOn}`);
	      console.log('  Action:');
	      console.log(`    On:         ${group.on}`);
	      console.log(`    Brightness: ${group.brightness}`);
	      console.log(`    Color mode: ${group.colorMode}`);
	      console.log(`    Hue:        ${group.hue}`);
	      console.log(`    Saturation: ${group.saturation}`);
	      console.log(`    X/Y:        ${group.xy[0]}, ${group.xy[1]}`);
	      console.log(`    Color Temp: ${group.colorTemp}`);
	      console.log(`    Alert:      ${group.alert}`);
	      console.log(`    Effect:     ${group.effect}`);
	 
	      if (group.modelId !== undefined) {
	        console.log(`  Model Id: ${group.modelId}`);
	        console.log(`  Unique Id: ${group.uniqueId}`);
	        console.log('  Model:');
	        console.log(`    Id:           ${group.model.id}`);
	        console.log(`    Manufacturer: ${group.model.manufacturer}`);
	        console.log(`    Name:         ${group.model.name}`);
	        console.log(`    Type:         ${group.model.type}`);
	      }
	 
	      console.log();
	    }
	    res.send(groups);
	  });
  
});


router.post('/groups/status', function(req, res, next) {

	var reqbody = req.body;
    var status = reqbody.status;
    var device = reqbody.device;

	console.log("changing the status of device "+ device + " status to "+status);

	let client = new huejay.Client({
      host:     '10.0.0.97',
      username: 'kkdGiCK6p2Jt865LzKPg9mIAhhHSoVxMjL0RjLkH'
    });


	client.groups.getById(1)
	  .then(group => {

	  	if(!status){
	  		 group.on         = status;
	  	}else{
	  		group.lightIds   = [1, 2, 3, 4];
	  		group.on         = true;
		    group.brightness = 254;
		    group.effect     = 'colorloop';
	  	}
	    
	    client.groups.save(group);
	  })
	  .catch(error => {
	  	console.log('Something went wrong during change in lights group status ')
	    console.log(error.stack);
	    var message = {'status':500, 'message': error};
	  });
	  var message = {'status':200, 'message': 'Successful changed all bulbs group status to '+status};
  res.send(message);
});


module.exports = router;
