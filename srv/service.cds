using { proj_schema as my } from '../db/schema';

@requires: 'authenticated-user'
service CatalogService {
    @odata.draft.enabled
 entity tab1 as projection on my.PAN_Details where created_by = $user and ltrim(rtrim(task_id))!='';
 entity tab2 as projection on my.PAN_WEB_EVENT;
 entity tab3 as projection on my.PAN_TYPE;
//  @odata.draft.enabled
 entity vendor_data as projection on my.PAN_vendor_data;
 entity Fvendor_responseoo as projection on my.PAN_vendor_response; 
 entity PAYMENT_TERM_DETAILS as projection on my.PAN_PAYMENT_TERM_DETAILS;
  //  @odata.draft.enabled
 entity PAN_PRICE_DETAILS as projection on my.PAN_PRICE_DETAILS;
 entity WORKFLOW_HISTORY as projection on my.PAN_WORKFLOW_HISTORY;
 entity attachments as projection on my.PAN_attachments;
 entity PAN_Payment_Method_Drop as projection on my.PAN_Payment_Method_Drop;
entity PAN_Comments as projection on my.PAN_Comments;
function sendforapproval(data:String) returns LargeString;
 function InsertData(ID:String) returns String;
 function getData(ID:String) returns String;
 function switch_control(ID:String) returns String;
 function getuserinfo(ID:String) returns String;
function getcomments(ID:String) returns String;
function getsync(data:String) returns String;
function draft(ID:String) returns String;
function Listdata(ID:String) returns String;
function flag (ID:String,case:String) returns String;
function updatee(ID:String) returns String;
}
service PanApproval {
 entity PAN_Details_APR as projection on my.PAN_Details;
 entity PAN_WEB_EVENT_APR as projection on my.PAN_WEB_EVENT;
 entity PAN_TYPE_APR as projection on my.PAN_TYPE;
 entity PAN_vendor_data_APR as projection on my.PAN_vendor_data;
 entity PAN_vendor_response_APR as projection on my.PAN_vendor_response; 
 entity PAN_PAYMENT_TERM_DETAILS_APR as projection on my.PAN_PAYMENT_TERM_DETAILS;
 entity PAN_PRICE_DETAILS_APR as projection on my.PAN_PRICE_DETAILS;
 entity PAN_WORKFLOW_HISTORY_APR as projection on my.PAN_WORKFLOW_HISTORY;
 entity PAN_attachments_APR as projection on my.PAN_attachments;
 entity PAN_Payment_Method_Drop_APR as projection on my.PAN_Payment_Method_Drop;
 entity PAN_Comments_APR as projection on my.PAN_Comments;
 entity vendorTaxDetails_APR as projection on my.vendorTaxDetails;
  function sendforapproval(data:String) returns LargeString;
 function InsertData(ID:String) returns String;
 function finalApprove(data:String) returns String;
 function getData(ID:String) returns String;
 function switch_control(ID:String) returns String;
 function getuser(ID:String) returns String;
 function Reject(data:String) returns String;
 function getcomments(ID:String) returns String;
}