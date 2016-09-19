<?php
if(isset($_POST['email']))
{
    $email_to = "mail@DanieleCasati.com";
    $email_subject = "Email Submission from DanieleCasati.com";

    function died($error)
	{
        echo "I am very sorry, but there were error(s) found with the form you submitted. ";
        echo "These errors appear below.<br /><br />";
        echo $error."<br /><br />";
        echo "Please go back and fix these errors.<br /><br />";
        die();
    }

    if(!isset($_POST['email']))
	{
        died('I am very sorry, but there appears to be a problem with the form you submitted.');       
    }

    $email_from = $_POST['email']; // required

    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
	if(!preg_match($email_exp,$email_from))
	{
		$error_message .= 'The email you entered does not appear to be valid.<br />';
	}
	if(strlen($error_message) > 0)
	{
		died($error_message);
	}
	
    $email_message = "Form details below.\n\n";

    function clean_string($string)
	{
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }

    $email_message .= "Email: ".clean_string($email_from)."\n";
	
// Email Headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers);
?>

Thank you for showing me your interest. I will be in touch with you very soon.
 
<?php
}
die();
?>