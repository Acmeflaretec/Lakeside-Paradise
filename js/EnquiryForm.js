function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        return false;
    } else {
        return true;
    }
}

function chkURL(value) {
    var re = /(http(s)?:\\)?([\w-]+\.)+[\w-]+[.com|.in|.org|.mil|.edu|.net|]+(\[\?%&=]*)?/
    var trimmed = $.trim(value);
    if (re.test(trimmed)) {
        return false;
    }
}

function fnnameqc() {
    var name = $("#txtName").val().trim();
    if (name.length === 0) {
        $("#spName").text("Enter Your Name");
    } else {
        $("#spName").text('');
    }
}

function fnnamebr() {
    var name = $("#txtName").val().trim();
    if (name.length === 0) {
        $("#spName").text("Enter Your Name");
    } else {
        $("#spName").text('');
    }
}

function fnnamereg() {
    var name = $("#txtnamereg").val().trim();
    if (name.length === 0) {
        $("#spnamereg").text("Enter Your Name");
    } else {
        $("#spnamereg").text('');
    }
}

function fnrolereg() {
    var name = $("#rolereg option:selected").val().trim();
    if (name.length === 0) {
        $("#sprolereg").text("Select role");
    } else {
        $("#sprolereg").text('');
    }
}

function fnemailqc() {
    var email = $("#txtEmail").val().trim();
    if (email.length === 0) {
        $("#spEmail").text("Enter Email Id");
    } else {
        var _femail = IsEmail(email);
        if (_femail === false) {
            $("#spEmail").text("Invalid Email id.");
        } else {
            $("#spEmail").text('');
        }
    }
}

function fnemailreg() {
    var email = $("#txtemailreg").val().trim();
    if (email.length === 0) {
        $("#spemailreg").text("Enter Email Id");
    } else {
        var _femail = IsEmail(email);
        if (_femail === false) {
            $("#spemailreg").text("Invalid Email id.");
        } else {
            $("#spemailreg").text('');
        }
    }
}

function fnphoneqc() {
    var phone = $("#mobile_code").val().trim();
    if (phone.length === 0) {
        $("#spContactno").text("Enter Contact No.");
    } else {
        if (phone.length < 7) {
            $("#spContactno").text("Invalid Contact No.");
        } else {
            $("#spContactno").text('');
        }
    }
}

function fnphonereg() {
    var phone = $("#Register_Now").val().trim();
    if (phone.length === 0) {
        $("#spcontactreg").text("Enter Contact No.");
    } else {
        if (phone.length < 7) {
            $("#spcontactreg").text("Invalid Contact No.");
        } else {
            $("#spcontactreg").text('');
        }
    }
}



function saveprojqc() {
    var _url = window.location.origin.toString() + "/SendDataNew.aspx/addqc";
    var error = '';
    var name = $("#txtName").val();
    var city = 'NA';
    var ccode = '';
    var email = $("#txtEmail").val();
    var mob = $("#mobile_code").val();
    var message = $("#role option:selected").val();
    var project = window.location.toString();

    var flg = $("#contact .iti__selected-dial-code").length;
    if (flg.toString() != "0") {
        ccode = $("#contact .iti__selected-dial-code").html();
    }

    if (name.length === 0) {
        error += "-Enter Your Name";
        $("#spName").text("Enter Your Name");
    }
    if (email.length === 0) {
        error += '\n-Enter Email Id';
        $("#spEmail").text("Enter Email Id");
    } else if (IsEmail(email) === false) {
        error += "\n-Invalid Email Id.";
        $("#spEmail").text("Invalid Email Id");
    }
    if (mob.length === 0) {
        error += '\n-Phone No is required.';
        $("#spContactno").text("Phone No is required");
    } else if (mob.length < 6) {
        error += "\nInvalid Phone No";
        $("#spContactno").text("Invalid Phone No");
    }

    if (error.length > 0) {
        alert(error);
    } else {
        $("#loadermdl").removeClass("noloaderr").addClass("loaderr");
        mob = ccode + mob;
        var obj = {};
        obj.name = name;
        obj.email = email;
        obj.mob = mob;
        obj.city = city;
        obj.message = message;
        obj.project = project;
        obj.clientuserid = '';
        $.ajax({
            type: "POST",
            url: _url,
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                if (data.d.length > 0) {
                    msg = data.d;
                }
            },
            complete: function() {
                $("#loadermdl").removeClass("loaderr").addClass("noloaderr");

                $("#txtName").val('');
                $("#txtEmail").val('');
                $("#mobile_code").val('');
                $("#spEmail").text("I");
                $("#spContactno").text("");
                localStorage.setItem('referer', window.location.toString());
                window.location.href = window.location.origin.toString() + "/Thanks.aspx";
                //window.location.href = "https://api.whatsapp.com/send?phone=971525549435&text=Thanks for your enquiry.";

            }
        });
    }
    return true;
}

function saveregqc() {
    var _url = window.location.origin.toString() + "/SendDataNew.aspx/addqc";
    var error = '';
    var name = $("#txtnamereg").val();
    var city = 'NA';
    var ccode = '';
    var email = $("#txtemailreg").val();
    var mob = $("#Register_Now").val();
    var message = $("#rolereg option:selected").val();
    var project = window.location.toString();

    var flg = $("#dreamit-form1 .iti__selected-dial-code").length;
    if (flg.toString() != "0") {
        ccode = $("#dreamit-form1 .iti__selected-dial-code").html();
    }

    if (name.length === 0) {
        error += "-Enter Your Name";
        $("#spnamereg").text("Enter Your Name");
    }
    if (email.length === 0) {
        error += '\n-Enter Email Id';
        $("#spemailreg").text("Enter Email Id");
    } else if (IsEmail(email) === false) {
        error += "\n-Invalid Email Id.";
        $("#spemailreg").text("Invalid Email Id");
    }
    if (mob.length === 0) {
        error += '\n-Phone No is required.';
        $("#spcontactreg").text("Phone No is required");
    } else if (mob.length < 6) {
        error += "\nInvalid Phone No";
        $("#spcontactreg").text("Invalid Phone No");
    }
    if (message.length === 0) {
        error += "-Select role";
        $("#sprolereg").text("Select role");
    }
    if (error.length > 0) {
        alert(error);
    } else {
        $("#loaderregqc").removeClass("noloaderr").addClass("loaderr");
        mob = ccode + mob;
        var obj = {};
        obj.name = name;
        obj.email = email;
        obj.mob = mob;
        obj.city = city;
        obj.message = message;
        obj.project = project;
        obj.clientuserid = '';
        $.ajax({
            type: "POST",
            url: _url,
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                if (data.d.length > 0) {
                    msg = data.d;
                }
            },
            complete: function() {
                $("#loaderregqc").removeClass("loaderr").addClass("noloaderr");
                $("#txtnamereg").val('');
                $("#txtemailreg").val('');
                $("#Register_Now").val('');
                $("#rolereg").val('');
                $("#spnamereg").text("");
                $("#spemailreg").text("");
                $("#spcontactreg").text("");
                $("#sprolereg").text("");
                localStorage.setItem('referer', window.location.toString());
                window.location.href = window.location.origin.toString() + "/Thanks.aspx";
                //window.location.href = "https://api.whatsapp.com/send?phone=971525549435&text=Thanks for your enquiry.";

            }
        });
    }
    return true;
}

function savebrochureqc() {

    var _url = window.location.origin.toString() + "/SendDataNew.aspx/addqc";
    var error = '';
    var name = $("#txtnamebr").val();
    var city = 'NA';
    var ccode = '';
    var email = $("#txtemailbr").val();
    var mob = $("#Brochure").val();
    var message = $("#rolebr option:selected").val();
    var project = window.location.toString();

    var flg = $("#dreamit-form .iti__selected-dial-code").length;
    if (flg.toString() != "0") {
        ccode = $("#dreamit-form .iti__selected-dial-code").html();
    }

    if (name.length === 0) {
        error += "-Enter Your Name";
        $("#spnamebr").text("Enter Your Name");
    }
    if (email.length === 0) {
        error += '\n-Enter Email Id';
        $("#spemailbr").text("Enter Email Id");
    } else if (IsEmail(email) === false) {
        error += "\n-Invalid Email Id.";
        $("#spemailbr").text("Invalid Email Id");
    }
    if (mob.length === 0) {
        error += '\n-Phone No is required.';
        $("#spcontactbr").text("Phone No is required");
    } else if (mob.length < 6) {
        error += "\nInvalid Phone No";
        $("#spcontactbr").text("Invalid Phone No");
    }
    if (message.length === 0) {
        error += "\n-Select role";
        $("#sprolebr").text("Select role");
    }
    if (error.length > 0) {
        alert(error);
    } else {
        $("#loaderbrqc").removeClass("noloaderr").addClass("loaderr");
        mob = ccode + mob;
        var obj = {};
        obj.name = name;
        obj.email = email;
        obj.mob = mob;
        obj.city = city;
        obj.message = message;
        obj.project = project;
        obj.clientuserid = '';
        $.ajax({
            type: "POST",
            url: _url,
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                if (data.d.length > 0) {
                    msg = data.d;
                }
            },
            complete: function() {
                $("#loaderbrqc").removeClass("loaderr").addClass("noloaderr");

                $("#txtnamebr").val('');
                $("#txtemailbr").val('');
                $("#Brochure").val('');
                $("#rolebr option:selected").val('');
                $("#spnamebr").text("");
                $("#spemailbr").text("");
                $("#spcontactbr").text("");
                $("#sprolebr").text("");
                localStorage.setItem('referer', window.location.toString());
                window.location.href = window.location.origin.toString() + "/Thanks.aspx";
                // window.location.href =window.location.origin.toString()+ "/sample.pdf";
                // window.location.href = "https://api.whatsapp.com/send?phone=971525549435&text=Thanks for your enquiry.";

            }
        });
    }
    return true;
}

function fnRequestHeading(Heading) {
    $("#RequestId").text(Heading);
    $("#hdnVisitType").val(Heading);
    if (Heading == "Download Brochure")
        $("#btnSubmit").html("Download Now");
    else
        $("#btnSubmit").html("Submit");

}

function fnnamemdlqc() {
    var name = $("#txtNamemdl").val().trim();
    if (name.length === 0) {
        $("#spNamemdl").text("Enter Your Name");
    } else {
        $("#spNamemdl").text('');
    }
}

function fncitymdlqc() {
    var name = $("#txtCitymdl").val().trim();
    if (name.length === 0) {
        $("#spCitymdl").text("Enter Your City");
    } else {
        $("#spCitymdl").text('');
    }
}

function fnemailmdlqc() {
    var email = $("#txtEmailmdl").val().trim();
    if (email.length === 0) {
        $("#spEmailmdl").text("Enter Email Id");
    } else {
        var _femail = IsEmail(email);
        if (_femail === false) {
            $("#spEmailmdl").text("Invalid Email id.");
        } else {
            $("#spEmailmdl").text('');
        }
    }
}

function fnphonemdlqc() {
    var phone = $("#txtContactNomdl").val().trim();
    if (phone.length === 0) {
        $("#spContactNomdl").text("Enter Contact No.");
    } else {
        if (phone.length < 7) {
            $("#spContactNomdl").text("Invalid Contact No.");
        } else {
            $("#spContactNomdl").text('');
        }
    }
}

function fnnamebrqc() {
    var name = $("#txtnamebr").val().trim();
    if (name.length === 0) {
        $("#spnamebr").text("Enter Your Name");
    } else {
        $("#spnamebr").text('');
    }
}

function fnemailbrqc() {
    var email = $("#txtemailbr").val().trim();
    if (email.length === 0) {
        $("#spemailbr").text("Enter Email Id");
    } else {
        var _femail = IsEmail(email);
        if (_femail === false) {
            $("#spemailbr").text("Invalid Email id.");
        } else {
            $("#spemailbr").text('');
        }
    }
}

function fnphonebrqc() {
    var phone = $("#txtContactNobr").val().trim();
    if (phone.length === 0) {
        $("#spcontactbr").text("Enter Contact No.");
    } else {
        if (phone.length < 7) {
            $("#spcontactbr").text("Invalid Contact No.");
        } else {
            $("#spcontactbr").text('');
        }
    }
}

function fnrolebrqc() {
    var role = $("#role option:selected").val().trim();
    if (role.length === 0) {
        $("#sprolebr").text("Select role");
    } else {
        $("#sprolebr").text('');
    }
}

function saveprojbrqc() {
    var _url = window.location.origin.toString() + "/SendData.aspx/addqc";
    var error = '';
    var name = $("#txtNamebr").val();
    var city = "";
    var email = $("#txtEmailbr").val();
    var mob = $("#txtContactNobr").val();
    var message = $("#hdnMessageType").val();
    var project = window.location.toString();
    if (name.length === 0) {
        error += "-Enter Your Name";
        $("#spNamebr").text("Enter Your Name");
    }
    if (email.length === 0) {
        error += '\n-Enter Email Id';
        $("#spEmailbr").text("Enter Email Id");
    } else if (IsEmail(email) === false) {
        error += "\n-Invalid Email Id.";
        $("#spEmailbr").text("Invalid Email Id");
    }
    if (mob.length === 0) {
        error += '\n-Phone No is required.';
        $("#spContactNobr").text("Phone No is required");
    } else if (mob.length < 6) {
        error += "\nInvalid Phone No";
        $("#spContactNobr").text("Invalid Phone No");
    }
    if (error.length > 0) {
        alert(error);
    } else {
        $("#loaderbr").removeClass('loaderr d-none');
        $("#loaderbr").addClass('loaderr d-block');
        var obj = {};
        obj.name = name;
        obj.email = email;
        obj.mob = mob;
        obj.city = city;
        obj.message = message;
        obj.project = project;
        $.ajax({
            type: "POST",
            url: _url,
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                if (data.d.length > 0) {
                    msg = data.d;
                }
            },
            complete: function() {
                $("#loaderbr").removeClass('loaderr d-block');
                $("#loaderbr").addClass('loaderr d-none');
                $("#SendbrId").removeClass('send d-none');
                $("#SendbrId").addClass('send d-block');
                $("#txtNamebr").val('');
                $("#txtEmailbr").val('');
                $("#txtContactNobr").val('');
                $('#enquiry').modal('hide');
                $('#MessageId').modal('show');
            }
        });
    }
    return true;
}

function fnMessageType(Heading) {
    $("#hdnMessageType").val(Heading);
}