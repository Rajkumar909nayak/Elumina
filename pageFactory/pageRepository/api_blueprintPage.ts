
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

let roleName = makeid(9)
let emailTemplateName = makeid(8)
let dashboadr_name = makeid(9)
let training_center_name = makeid(10)
let training_site_name = makeid(9)
let grade_scale_name = makeid(10)
let gradeBookName = makeid(12)
let filename = makeid(10)

export var jsonObject =
{
    //User related payload 
    "blueprint_list_custom_filter_save_public_or_privet": {
        "filterArray": {
            "filterName": makeid(11),
            "filterType": "private",
            "filterPage": "showblueprint",
            "filter_id": ""
        },
        "customFilter": [
            {
                "filterId": "Status",
                "operator": "eq",
                "displayText": "Status <span><strong>is equal to</strong></span> ",
                "filterValue1": "Approved",
                "filterValue2": "select6",
                "filterValue3": "",
                "operation": ""
            }
        ]
    },
    "image_custome_filter_save_public_or_privet": {
        "filterArray": {
            "filterName": makeid(12),
            "filterType": "public",
            "filterPage": "images",
            "filter_id": ""
        },
        "customFilter": [
            {
                "filterId": "Name",
                "operator": "like",
                "displayText": "Name <span>is like</span> ",
                "filterValue1": "image",
                "filterValue2": "",
                "filterValue3": "",
                "operation": ""
            }
        ]
    },
    "EditFileName": filename
}