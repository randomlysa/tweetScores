<?php

// Include library.
require "./twitteroauth/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;

// Key, secret, callback.
require("config.php");

// Start session.
session_start();
$request_token = [];
$request_token['oauth_token'] = $_SESSION['oauth_token'];
$request_token['oauth_token_secret'] = $_SESSION['oauth_token_secret'];

if (isset($_REQUEST['oauth_token']) && $request_token['oauth_token'] !== $_REQUEST['oauth_token']) {
    // Abort! Something is wrong.
    print "SOMETHING IS WRONG";
}

// Now we make a TwitterOAuth instance with the temporary request token.
$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $request_token['oauth_token'], $request_token['oauth_token_secret']);

// At this point we will use the temporary request token to get the long lived access_token that authorized to act as the user.
$getAccessToken = $connection->oauth("oauth/access_token", ["oauth_verifier" => $_REQUEST['oauth_verifier']]);

// Set some variables.
$access_token = $getAccessToken['oauth_token'];
$token_secret = $getAccessToken['oauth_token_secret'];
$clientid = sha1($access_token . $token_secret);


// Save access_token['oauth_token'] and access_token['oauth_token_secret']
// Get info from config.php.
require('config.php');
// Connect.
$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);

// Check if clientid exists in the database.
// This is to save auth token / token secret for the clientid.
// At this point, clientid should be pretty safe since it's a sha1 of the token and secret returned from twitter.

// Prepare statment.
if ($checkClientId = $mysqli->prepare("SELECT `clientid` FROM tweetClients WHERE `clientid` = ?")) {
    $checkClientId->bind_param('s', $clientid);
    $checkClientId->execute();
    // $checkClientId->bind_result($oauth_token, $token_secret);
    $checkClientId->store_result();
    $doesClientIDExist = $checkClientId->num_rows;
    $checkClientId->close();
}

if(!$checkClientId){
    die('Error : ('. $mysqli->errno .') '. $mysqli->error);
}

// Client doesn't exist in DB. Save.
if ($doesClientIDExist == 0) {
    // Prepare succeeded.
    if ($saveInfo = $mysqli->prepare("INSERT INTO tweetClients(`clientid`, `oauth_token`, `oauth_token_secret`) VALUES(?,?,?)")) {
        $saveInfo->bind_param('sss', $clientid, $access_token, $token_secret);
        $saveInfo->execute();
        $saveInfo->close();
    // Prepare failed.
    } else {
        die('Error : ('. $mysqli->errno .') '. $mysqli->error);
    }
// Client exists in DB.
} else {
    // print "Client exists in DB.";
}
?>

<html><head><title>TweetScores Twitter Authentication</title>
    <meta http-equiv="refresh" content="3; URL=http://code.randomlysa.com/tweetScores/" />
</head>
<body>
<script>
    let state;
    if (localStorage.getItem('score')) {
        state = JSON.parse(localStorage.getItem('score'));
    }
    const newState = { ...state, 'twitterAuth': '<?php echo $clientid; ?>' };
    localStorage.setItem('score', JSON.stringify(newState));

</script>
    Login Successful! You will be redirected to the home page soon. <br>
    If not, <a href="/tweetScores/">click here.</a>
</body>
</html>
