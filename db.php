<?php
// Get info from config.php.
require('config.php');

// Connect.
$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);

// Output any connection error.
if ($mysqli->connect_error) {
    die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
} else {
    print "Connected OK.";
}

// Close connection.
$mysqli->close();

?>
