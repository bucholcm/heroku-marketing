
function forceLogin(key) {
	force.init({
        appId: '3MVG9Rd3qC6oMalV2V8N41H8CPzd9INoa4g19zAjyr5.6e.u5q4BrPhcIhsJDKaCm3uCKneRpgM3n32lkVjVV',
        apiVersion: 'v32.0',
        loginURL: 'https://bucholc-dev-ed.my.salesforce.com',
        oauthCallbackURL: 'https://lgtn-node.herokuapp.com/oauthcallback'
    });
    force.login(
        function(success) {
            console.log('Salesforce login succeeded');
            setupLightning(success);
        },
        function(error) {
            console.log(error);
            alert('Salesforce login failed');
        });
}

var _lightningReady = false;

function setupLightning(oauth, callback) {
	var appName = config.loApp;
    if (!oauth) {
        alert("Please login to Salesforce.com first!");
        return;
    }

	if (_lightningReady) {
		if (typeof callback === "function") {
			callback();
		}
	} else {
	    // Transform the URL for Lightning
	    var url = oauth.instance_url.replace("my.salesforce", "lightning.force");
	    console.log(url);
	    console.log(oauth.access_token);

	    $Lightning.use(appName, 
	        function() {
				_lightningReady = true;
				document.getElementById("chatterFeedButton").style.display = "";
				if (typeof callback === "function") {
					callback();
				}
	        }, url, oauth.access_token);
	}
}

function createChatterFeed(type, subjectId) {
	console.log('create chatter feed');
	$Lightning.createComponent("c:LeadCreator", {}, "chatterFeed"); 
}
