<?php

// Include library.
require "./twitteroauth/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;

// Key, secret, callback.
require("config.php");

// Connect to API.
$connection = new TwitterOAuth(
    CONSUMER_KEY,
    CONSUMER_SECRET
);

// Generate a request_token.
$request_token = $connection->oauth('oauth/request_token', array('oauth_callback' => OAUTH_CALLBACK));

// Save info to session.
session_start();
$_SESSION['oauth_token'] = $request_token['oauth_token'];
$_SESSION['oauth_token_secret'] = $request_token['oauth_token_secret'];

// Build authorize URL.
$url = $connection->url('oauth/authorize', array('oauth_token' => $request_token['oauth_token']));

// Redirect to twitter auth url.
header ("Location: $url");

?>
