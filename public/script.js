function messagesent()
{
	alert("Your message has been sent to us\nThank you for contacting us ^_^ ");
}
function donationdone()
{
	alert("Thank you for your donation ^_^ ");
}


function changecatID() {
	var catradio = document.getElementById("radiocatID").checked;
    if (catradio == true)
	{
    	document.getElementById("textcatID").disabled =false;
    }
	else
	{
    	document.getElementById("textcatID").disabled =true;	
	}
}

function  amountdonated()
{
	var amount = document.getElementById("amount");
	
	if( parseInt(amount.value) < 10)
		alert("u can't enter less than $10");
}

function checkpayform() {
	var fname = document.getElementById("fullname").value;
	var exdate = document.getElementById("exdate").value;
	var cardno = document.getElementById("cardno").value;
	var secno  = document.getElementById("securityno").value;
	var patt =  new RegExp("^[A-Z]{1}[a-z]+\\s[A-Z]{1}[a-z]+");
	var txt = "";
	if ( patt.test(fname) == false)
	{
		txt+="You Should enter a vaild name like Ahmed Ehab\n";
	}
	if( cardno.length < 16 || cardno.length > 16)
	{
		txt+="*Incorrect Card No the length should be 16 digits\n";
	}
	if(secno.length < 3 || secno.length > 3) 
	{
		txt+="*Incorrect Card No the length should be 3 digits\n";
	}
	if(new Date(exdate).getTime() <= new Date().getTime() )
	{
		txt+="*Your Card had been expired\n";
	}
	if(txt.length > 0)
	alert(txt);
}