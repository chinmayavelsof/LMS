
$(function () {

    "use strict";

    var messages = {
	'mandatory' : 'This field is required.',
	'price' : 'This field is required with max length of 16 & must be in price format e.g. 350.74.',
	'email' : 'This field is required & must be a valid email address.',
	'passwd' : 'This field is required with length between 5 - 10 & must contain at least one Capital, Special character and Number.',
	'notRequiredPasswd' : 'Length should be between 5 - 10 & must contain at least one Capital, Special character and Number.',
	'mobile' : 'This field is required & must be having 10 digits only.',
	'addressLine1' : 'This field is required & length should be between 2 to 255.',
	'addressLine2' : 'Length should be between 2 to 255.',
	'digit' : 'This field is required & must be having digits only.',
	'notRequiredDigit' : 'This field must be having digits only.',
	'pincode' : 'This field is required & must be having 6 digits only.',
	'firstname' : 'This field is required & length should be between 2 to 60.',
	'lastname' : 'This field is required & length should be between 2 to 60.',
	'middlename' : 'Length should be between 2 to 60.',
	'requiredMin2Max60NoSpecial' : 'This field is required & length should be between 2 to 60 with no special character.',
	'requiredip' : 'This field is required & must be having a valid ip.',
	'optionalip' : 'This field must be having a valid ip.',
	'requiredimage' : 'This fields is required & image type should be gif, png,jpeg or jpg & should not exceed 2 MB in size',
	'optionalimage' : 'Image type should be gif, png,jpeg or jpg  & should not exceed 2 MB in size',
	'requiredcharonly' : 'This fields is required & must have characters only.',
	'optionalcharonly' : 'This field must have characters only.',
	'barcode' : 'Length should be between 2 to 255 and should not contain any special character.',
	'ean' : 'Length should be between 2 to 14 and should not contain any special character.',
	'upc' : 'Length should be between 2 to 12 and should not contain any special character.',
	'size' : 'Length should be between 1 to 10 and should not contain any special character.',
	'requiredurl' : 'This field is required & length should be between 5 to 255 & must be a URL.',
	'optionalurl' : 'Length should be between 5 to 255 & must be a URL.',
	'carrier' : 'Length should be between 3 to 255.',
	'brand' : 'Length should be between 3 to 64.',
	'optionalcompany' : 'Length should be between 3 to 32.',
	'requiredcompany' : 'This field is required & length should be between 3 to 32.',
	'sku' : 'Length should be between 3 to 64 and should not contain any special character.',
	'requiredmmddyy' : 'This field is required & date should be in mmddyy format.',
	'optionalmmddyy' : 'Date should be in mmddyy format.',
	'requiredddmmyy' : 'This field is required & date should be in ddmmyy format.',
	'optionalddmmyy' : 'This field is required & date should be in ddmmyy format.',
	'optionalnumber' : 'This field must be numeric between 0 and 100.',
	'mandatorynumber' : 'This field is required & must be numeric between 0 and 100.',
	'scriptcheck' : 'This field must not have any script, iframe and style tag.',
	'htmltagcheck' : 'This field must not have any HTML tag.',
	'requireddocs' : 'This field is required & uploaded file should not exceed 2 MB in size.',
	'optionaldocs' : 'Uploaded file should not exceed 2 MB in size.',
	'mandatorycolor' : 'This field is required & should be a proper color code.',
	'optionalcolor' : 'Value should be a proper color code.',
    'confirm_password': "Confirm password doesn't match"
    };

    //Add New Method for - Price - Mandatory + Minimum Length 1 + Maximum Length 16 (Including Decimal Dot & 2 decimal values)
    jQuery.validator.addMethod("price", function (value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 1 || $.trim(value).length > 16 || !/^\d{0,13}(\.\d{0,2})?$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.price);


    //Add New Method for - Email - Mandatory + Email Validation
    jQuery.validator.addMethod("email", function (value, element) {
        if ($.trim(value) == "" || !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.email);

    //Add New Method for - Password - Mandatory + Minimum Length 5 + Maximum Length 10 + At least one Capital Letter + At least one Special Character + At least one Number
    jQuery.validator.addMethod("passwd", function (value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 5 || $.trim(value).length > 10 || !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{5,10}/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.passwd);

    //Add New Method for - Password Edit - Optional + Minimum Length 5 + Maximum Length 10 + At least one Capital Letter + At least one Special Character + At least one Number
    jQuery.validator.addMethod("notRequiredPasswd", function (value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length < 5 || $.trim(value).length > 10 || !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{5,10}/.test(value))) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredPasswd);

    //Add New Method for - Mobile No. - Mandatory + Number + Total Length 10
    jQuery.validator.addMethod("mobile", function (value, element) {
        if ($.trim(value) == "" || $.trim(value).length != 10 || !/^\d{10}?$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.mobile);


    //Add New Method for - Address Line 1 - Mandatory + Minimum Length 2 + Maximum Length 255
    jQuery.validator.addMethod("addressLine1", function (value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 255) {
            return false;
        } else {
            return true;
        }
    }, messages.addressLine1);

    //Add New Method for - Address Line 2 - Optional + Minimum Length 2 + Maximum Length 255
    jQuery.validator.addMethod("addressLine2", function (value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length < 2 || $.trim(value).length > 255)) {
            return false;
        } else {
            return true;
        }
    }, messages.addressLine2);

    //Add New Method for - Digits - Mandatory + Only Number
    jQuery.validator.addMethod("digit", function (value, element) {
        if ($.trim(value) == "" || !/^\d+$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.digit);

    //Add New Method for - Digits - Optional + Only Number
    jQuery.validator.addMethod("notRequiredDigit", function (value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if (!/^\d+$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredDigit);


    //Add New Method for - Mandatory
    jQuery.validator.addMethod("mandatory", function (value, element) {
        if ($.trim(value) == "") {
            return false;
        } else {
            return true;
        }
    }, messages.mandatory);

    //Add New Method for - Pincode - Mandatory + Only Numbers + Total Length 6
    jQuery.validator.addMethod("pincode", function (value, element) {
        if ($.trim(value) == "" || $.trim(value).length != 6 || !/^[1-9][0-9]{5}$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.pincode);

    //Add New Method for - Mandatory + Minimum Length 2 + Maximum Length 60
    jQuery.validator.addMethod("firstname", function (value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 60) {
            return false;
        } else {
            return true;
        }
    }, messages.firstname);

    //Add New Method for - Mandatory + Minimum Length 2 + Maximum Length 60
    jQuery.validator.addMethod("lastname", function (value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 60) {
            return false;
        } else {
            return true;
        }
    }, messages.lastname);

    //Add New Method for - Optional + Minimum Length 2 + Maximum Length 60
    jQuery.validator.addMethod("middlename", function (value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length < 2 || $.trim(value).length > 60)) {
            return false;
        } else {
            return true;
        }
    }, messages.middlename);

    //Add New Method for - Mandatory + Minimum Length 2 + Maximum Length 60 + No Special Character
    jQuery.validator.addMethod("requiredMin2Max60NoSpecial", function (value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 60 || !/^[a-zA-Z0-9]+$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin2Max60NoSpecial);

    //Add New Method for - Mandatory + IP
    jQuery.validator.addMethod("requiredip", function (value, element) {

        var testip = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if ($.trim(value) == "" || !value.match(testip)) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredip);

    //Add New Method for - Optional + IP
    jQuery.validator.addMethod("optionalip", function (value, element) {

        var testip = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if ($.trim(value) == "" || !value.match(testip)) {
            return false;
        } else {
            return true;
        }
    }, messages.optionalip);

    //Add New Method for - Mandatory + Image(gif, png,jpeg,jpg) + Maximum size 2 MB
    jQuery.validator.addMethod("requiredimage", function (value, element) {
        if ($.trim(value) != "") {
            var Extension = value.substring(value.lastIndexOf('.') + 1).toLowerCase();
            if (Extension == "jpeg" || Extension == "JPEG" || Extension == "png" || Extension == "jpg" || Extension == "gif") {
                if (element.prop("files")[0].size > 2097152) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }, messages.requiredimage);

    //Add New Method for - Optional + Image(gif, png,jpeg,jpg) + Maximum size 2 MB
    jQuery.validator.addMethod("optionalimage", function (value, element) {
        if ($.trim(value) != "") {
            var Extension = value.substring(value.lastIndexOf('.') + 1).toLowerCase();
            if (Extension == "jpeg" || Extension == "JPEG" || Extension == "png" || Extension == "jpg" || Extension == "gif") {
                if (element.prop("files")[0].size > 2097152) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else {
            return true;
        }
    }, messages.optionalimage);

    //Add New Method for - Madatory + Albhabets only
    jQuery.validator.addMethod("requiredcharonly", function (value, element) {
        if ($.trim(value) == "" || !/^[a-z]+$/i.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredcharonly);

    //Add New Method for - optional + Albhabets only
    jQuery.validator.addMethod("optionalcharonly", function (value, element) {
        if ($.trim(value) != "") {
            if (!/^[a-z]+$/i.test(value)) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }

    }, messages.optionalcharonly);

    //Add New Method for - optional + No speical character + Minimum Length 2 + Maximum Length 255
    jQuery.validator.addMethod("barcode", function (value, element) {
        if ($.trim(value) != "") {
            if ($.trim(value).length < 2 || $.trim(value).length > 255) {
                return false;
            } else {
			var splChars = "*|!,\":<>[]{}`\';()@&$#%";
                for (var i = 0; i < value.length; i++) {
                    if (splChars.indexOf(value.charAt(i)) != -1) {
                        return false;
                        break;
                    }
                }
				return true; 
            }
        } else {
            return true;
        }
    }, messages.barcode);

    //Add New Method for - optional + No speical character + Minimum Length 2 + Maximum Length 255
    jQuery.validator.addMethod("ean", function (value, element) {
        if ($.trim(value) != "") {
            if ($.trim(value).length < 2 || $.trim(value).length > 14) {
                return false;
            } else {
			var splChars = "*|!,\":<>[]{}`\';()@&$#%";
                for (var i = 0; i < value.length; i++) {
                    if (splChars.indexOf(value.charAt(i)) != -1) {
                        return false;
                        break;
                    }
                }
                return true;
            }
        } else {
            return true;
        }
    }, messages.ean);

    //Add New Method for - optional + No speical character +  Minimum Length 2 + Maximum Length 12
    jQuery.validator.addMethod("upc", function (value, element) {
        if ($.trim(value) != "") {
            if ($.trim(value).length < 2 || $.trim(value).length > 12) {
                return false;
            } else {
			var splChars = "*|!,\":<>[]{}`\';()@&$#%";
                for (var i = 0; i < value.length; i++) {
                    if (splChars.indexOf(value.charAt(i)) != -1) {
                        return false;
                        break;
                    }
                }
                return true;
            }
        } else {
            return true;
        }
    }, messages.upc);

    //Add New Method for - optional + No speical character +  Minimum Length 1 + Maximum Length 10
    jQuery.validator.addMethod("size", function (value, element) {
        if ($.trim(value) != "") {
            if ($.trim(value).length < 1 || $.trim(value).length > 14) {
                return false;
            } else {
			var splChars = "*|!,\":<>[]{}`\';()@&$#%";
                for (var i = 0; i < value.length; i++) {
                    if (splChars.indexOf(value.charAt(i)) != -1) {
                        return false;
                        break;
                    }
                }
                return true;
            }
        } else {
            return true;
        }
    }, messages.size);

    //Add New Method for - Mandatory + URL +  Minimum Length 5 + Maximum Length 255
    jQuery.validator.addMethod("requiredurl", function (value, element) {
        if ($.trim(value) != "") {
            if ($.trim(value).length < 5 || $.trim(value).length > 255) {
                var myRegExp = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
                if (!myRegExp.test(value)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }, messages.requiredurl);

    //Add New Method for - Optional + URL +  Minimum Length 5 + Maximum Length 255
    jQuery.validator.addMethod("optionalurl", function (value, element) {
        if ($.trim(value) != "") {
            if ($.trim(value).length < 5 || $.trim(value).length > 255) {
                var myRegExp = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
                if (!myRegExp.test(value)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else {
            return true;
        }
    }, messages.optionalurl);

    //Add New Method for - optional +  Minimum Length 3 + Maximum Length 255
    jQuery.validator.addMethod("carrier", function (value, element) {
        if ($.trim(value) != "") {
            if ($.trim(value).length < 3 || $.trim(value).length > 255) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }, messages.carrier);

    //Add New Method for - optional +  Minimum Length 3 + Maximum Length 64
    jQuery.validator.addMethod("brand", function (value, element) {
        if ($.trim(value) != "") {
            if ($.trim(value).length < 3 || $.trim(value).length > 64) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }, messages.brand);

    //Add New Method for - optional +  Minimum Length 3 + Maximum Length 32
    jQuery.validator.addMethod("optionalcompany", function (value, element) {
        if ($.trim(value) != "") {
            if ($.trim(value).length < 3 || $.trim(value).length > 32) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }, messages.optionalcompany);

    //Add New Method for - Mandatory +  Minimum Length 3 + Maximum Length 32
    jQuery.validator.addMethod("requiredcompany", function (value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 3 || $.trim(value).length > 32) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredcompany);

    //Add New Method for - optional + No speical character + Minimum Length 3 + Maximum Length 64
    jQuery.validator.addMethod("sku", function (value, element) {
        if ($.trim(value) != "") {
            if ($.trim(value).length < 3 || $.trim(value).length > 64) {
                return false;
            } else {
                var splChars = "*|!,\":<>[]{}`\';()@&$#%";
                for (var i = 0; i < value.length; i++) {
                    if (splChars.indexOf(value.charAt(i)) != -1) {
                        return false;
                        break;
                    }
                }
                return true;
            }
        } else {
            return true;
        }
    }, messages.sku);

    //Add New Method for - Mandatory + date in mmddyy format
    jQuery.validator.addMethod("requiredmmddyy", function (value, element) {
        if ($.trim(value) != "") {
            var dateformat = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
            var return_val = true;
            var val = $.trim(value);
            if (val != '') {
                if (val.match(dateformat)) {
                    var opera1 = val.split('/');
                    var opera2 = val.split('-');
                    lopera1 = opera1.length;
                    lopera2 = opera2.length;
                    // Extract the string into month, date and year  
                    if (lopera1 > 1)
                    {
                        var pdate = val.split('/');
                    }
                    else if (lopera2 > 1)
                    {
                        var pdate = val.split('-');
                    }
                    var mm = parseInt(pdate[0]);
                    var dd = parseInt(pdate[1]);
                    var yy = parseInt(pdate[2]);
                    // Create list of days of a month [assume there is no leap year by default]  
                    var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    if (mm == 1 || mm > 2)
                    {
                        if (dd > ListofDays[mm - 1])
                        {
                            return false;
                        }
                    }
                    if (mm == 2)
                    {
                        var lyear = false;
                        if ((!(yy % 4) && yy % 100) || !(yy % 400))
                        {
                            lyear = true;
                        }
                        if ((lyear == false) && (dd >= 29))
                        {
                            return false;
                        }
                        if ((lyear == true) && (dd > 29))
                        {
                            return false;
                        }
                    }
                }
                else
                {
                    return false;
                }
            } else {
                return false;
            }
            return true;
        } else {
            return false;
        }
    }, messages.requiredmmddyy);

    //Add New Method for - Optional + date in mmddyy format
    jQuery.validator.addMethod("optionalmmddyy", function (value, element) {
        if ($.trim(value) != "") {
            var dateformat = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
            var return_val = true;
            var val = $.trim(value);
            if (val != '') {
                if (val.match(dateformat)) {
                    var opera1 = val.split('/');
                    var opera2 = val.split('-');
                    lopera1 = opera1.length;
                    lopera2 = opera2.length;
                    // Extract the string into month, date and year  
                    if (lopera1 > 1)
                    {
                        var pdate = val.split('/');
                    }
                    else if (lopera2 > 1)
                    {
                        var pdate = val.split('-');
                    }
                    var mm = parseInt(pdate[0]);
                    var dd = parseInt(pdate[1]);
                    var yy = parseInt(pdate[2]);
                    // Create list of days of a month [assume there is no leap year by default]  
                    var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    if (mm == 1 || mm > 2)
                    {
                        if (dd > ListofDays[mm - 1])
                        {
                            return false;
                        }
                    }
                    if (mm == 2)
                    {
                        var lyear = false;
                        if ((!(yy % 4) && yy % 100) || !(yy % 400))
                        {
                            lyear = true;
                        }
                        if ((lyear == false) && (dd >= 29))
                        {
                            return false;
                        }
                        if ((lyear == true) && (dd > 29))
                        {
                            return false;
                        }
                    }
                }
                else
                {
                    return false;
                }
            } else {
                return false;
            }
            return true;
        } else {
            return true;
        }
    }, messages.optionalmmddyy);

    //Add New Method for - Mandatory + date in ddmmyy format
    jQuery.validator.addMethod("requiredddmmyy", function (value, element) {
        if ($.trim(value) != "") {

            var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
            var return_val = true;
            var val = $.trim(value);
            if (val != '') {
                if (val.match(dateformat))
                {
                    var opera1 = val.split('/');
                    var opera2 = val.split('-');
                    lopera1 = opera1.length;
                    lopera2 = opera2.length;
                    if (lopera1 > 1)
                    {
                        var pdate = val.split('/');
                    }
                    else if (lopera2 > 1)
                    {
                        var pdate = val.split('-');
                    }
                    var dd = parseInt(pdate[0]);
                    var mm = parseInt(pdate[1]);
                    var yy = parseInt(pdate[2]);
                    var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    if (mm == 1 || mm > 2)
                    {
                        if (dd > ListofDays[mm - 1])
                        {
                            return false;
                        }
                    }
                    if (mm == 2)
                    {
                        var lyear = false;
                        if ((!(yy % 4) && yy % 100) || !(yy % 400))
                        {
                            lyear = true;
                        }
                        if ((lyear == false) && (dd >= 29))
                        {
                            return_val = velovalidation.error('invalid_date');
                        }
                        if ((lyear == true) && (dd > 29))
                        {
                            return false;
                        }
                    }
                }
                else
                {
                    return false;
                }
            } else {
                return false;
            }
            return true;
            ;
        } else {
            return false;
        }
    }, messages.requiredddmmyy);

    //Add New Method for - Optional + date in ddmmyy format
    jQuery.validator.addMethod("optionalddmmyy", function (value, element) {
        if ($.trim(value) != "") {

            var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
            var return_val = true;
            var val = $.trim(value);
            if (val != '') {
                if (val.match(dateformat))
                {
                    var opera1 = val.split('/');
                    var opera2 = val.split('-');
                    lopera1 = opera1.length;
                    lopera2 = opera2.length;
                    if (lopera1 > 1)
                    {
                        var pdate = val.split('/');
                    }
                    else if (lopera2 > 1)
                    {
                        var pdate = val.split('-');
                    }
                    var dd = parseInt(pdate[0]);
                    var mm = parseInt(pdate[1]);
                    var yy = parseInt(pdate[2]);
                    var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    if (mm == 1 || mm > 2)
                    {
                        if (dd > ListofDays[mm - 1])
                        {
                            return false;
                        }
                    }
                    if (mm == 2)
                    {
                        var lyear = false;
                        if ((!(yy % 4) && yy % 100) || !(yy % 400))
                        {
                            lyear = true;
                        }
                        if ((lyear == false) && (dd >= 29))
                        {
                            return_val = velovalidation.error('invalid_date');
                        }
                        if ((lyear == true) && (dd > 29))
                        {
                            return false;
                        }
                    }
                }
                else
                {
                    return false;
                }
            } else {
                return false;
            }
            return true;
            ;
        } else {
            return true;
        }
    }, messages.optionalddmmyy);

    //Add New Method for - Optioanl + number only + between 0 and 100
    jQuery.validator.addMethod("optionalnumber", function (value, element) {
        if ($.trim(value) != "") {
            if (!value.match(/^-?\d*(\.\d+)?$/)) {
                return false;
            } else if (value < 0 || value > 100) {
                return false;
            }
            return true;
        } else {
            return true;
        }
    }, messages.optionalnumber);

    //Add New Method for - Mandatory + number only + between 0 and 100
    jQuery.validator.addMethod("mandatorynumber", function (value, element) {
        if ($.trim(value) != "") {
            if (!value.match(/^-?\d*(\.\d+)?$/)) {
                return false;
            } else if (value < 0 || value > 100) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    }, messages.mandatorynumber);

    //Add New Method for - No iframe tags + no script tags + no style tags
    jQuery.validator.addMethod("scriptcheck", function (value, element) {
        if ($.trim(value) != "") {
            var script_regex = /(<script[\s\S]*?>[\s\S]*?<\/script>)|(<script[\s\S]*?>)|([\s\S]*?<\/script>)/i;
            var style_regex = /(<style[\s\S]*?>[\s\S]*?<\/style>)|(<style[\s\S]*?>)|([\s\S]*?<\/style>)/i;
            var iframe_regex = /(<iframe[\s\S]*?>[\s\S]*?<\/iframe>)|(<iframe[\s\S]*?>)|([\s\S]*?<\/iframe>)/i;
            if (script_regex.test($.trim(value))) {
                return false;
            } else if (style_regex.test($.trim(value))) {
                return false;
            } else if (iframe_regex.test($.trim(value))) {
                return false;
            }
            return true;
        } else {
            return true;
        }
    }, messages.scriptcheck);

    //Add New Method for - No html tags
    jQuery.validator.addMethod("htmltagcheck", function (value, element) {
        if ($.trim(value) != "") {
            if (value.match(/([\<])([^\>]{1,})*([\>])/i)) {
                return false;
            }
            return true;
        } else {
            return true;
        }
    }, messages.htmltagcheck);

    //Add New Method for - Mandatory + docs(gif, png,jpeg,jpg, docx, ppt, xlsx etc) + Maximum size 2 MB
    jQuery.validator.addMethod("requireddocs", function (value, element) {
        if ($.trim(value) != "") {
            var Extension = value.substring(value.lastIndexOf('.') + 1).toLowerCase();
            if (Extension == "jpeg" || Extension == "JPEG" || Extension == "png" || Extension == "jpg" || Extension == "gif"
                    || Extension == "docx" || Extension == "ppt" || Extension == "xlsx") {
                if (element.prop("files")[0].size > 2097152) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }, messages.requireddocs);

    //Add New Method for - Optional + docs(gif, png,jpeg,jpg, docx, ppt, xlsx etc) + Maximum size 2 MB
    jQuery.validator.addMethod("optionaldocs", function (value, element) {
        if ($.trim(value) != "") {
            var Extension = value.substring(value.lastIndexOf('.') + 1).toLowerCase();
            if (Extension == "jpeg" || Extension == "JPEG" || Extension == "png" || Extension == "jpg" || Extension == "gif"
                    || Extension == "docx" || Extension == "ppt" || Extension == "xlsx") {
                if (element.prop("files")[0].size > 2097152) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else {
            return true;
        }
    }, messages.optionaldocs);
	
	    //Add New Method for - Mandatory + color only
    jQuery.validator.addMethod("mandatorycolor", function (value, element) {
        var firstchar = value.charAt(0);
        if (value != '') {
				value = value.substr(1);
				if(firstchar != '#'){
					return false;
				}
				var myRegExp = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i;
				if (!myRegExp.test(value)) {
					return false;
				} else {
					return true;
				}
			} else {
				return false;
		}
    }, messages.mandatorycolor);
	
	    //Add New Method for - Optional + color only
    jQuery.validator.addMethod("optionalcolor", function (value, element) {
        var firstchar = value.charAt(0);
        if (value != '') {
				value = value.substr(1);
				if(firstchar != '#'){
					return false;
				}
				var myRegExp = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i;
				if (!myRegExp.test(value)) {
					return false;
				} else {
					return true;
				}
			} else {
				return true;
		}
    }, messages.optionalcolor);

    jQuery.validator.addMethod("confirm_password", function (value, element) {
        var password = $("#password").val(); // ID of the main password field
        return value === password; // must match exactly
    }, messages.confirm_password);


    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    $("#sample").validate({

        highlight: function(label) {
            $(label).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        success: function(label) {
            $(label).closest('.form-group').removeClass('has-error');
            label.remove();
        }
    });
});




