namespace proj_schema;
using {
    cuid,
    managed
} from '@sap/cds/common';

@cds.persistance.exists
entity PAN_Details{
key PAN_Number : String default'def';


SBG : String;
SBU : String;
BUORPurchasing_Group : String;
Plant_Code : String;
Project_Description : String;
PR_NumberBKTsBKT : String; 
Subject_of_ProposalOROrder : String;
Previous_PAN_References : String;
Split_OrderORNo_of_vendors : String;
SOP_Type : String;
Order_Type_OR_Document_tyFuuidpe : String;
Asset_Type : String;
Nature_of_Transaction : String;
Order_Location_OR_Plant : String;
Base_line_spend : String;
Project_CurrencyORBase_Currency : String;
Order_CurrencyORBid_currency : String;
Final_proposed_Value : String;
Savings_achieved_btw_initial_and_final_quote : String;
Savings_against_base_line_spend_of_RFP : String;
Number_of_Vendors_Shortlisted_for_RFP : String;
Number_of_Vendors_Technically_Qualified : String;
Required_at_Site_Date : String;
RFP_Number : String;
RFP_Publish_Date : String;
Time_Taken_for_FinalizationDASHIn_DAYS : String;
status : String;
statusInd :Integer;//used for criticality rep
created_by :String;
task_id : String;
type : String;
status_a :String;
switch_control:Boolean default false;
//vendor data
// Proposed_Vendor_Name : String; 
// Proposed_Vendor_Code : String; 
// Supplier_Origin_State : String; 
// Destination_State_BKTShipDASHto_LocationBKT : String; 
// Vendor_GST_Number : String; 
// Vendor_CE_Score : String; 
// Vendor_CE_Date : String; 
// Vendor_PE_Score : String; 
// Vendor_PE_Date : String; 
// Vendor_Contact_PersonDASH1 : String; 
// Vendor_Contact_PersonDASH2 : String; 
// Technical_Committee_who_cleared_the_proposal : String; 
// Commercial_Committee_who_cleared_the_proposal : String; 
// Vendor_References_to_be_displayed_in_Order : String; 
// Shortlisted_Vendors_Response_summary : String; 
//
// ATTACHMENTS_INTERNAL_TO_PAN_FOR_APPROVERS : String; 
// Incoterms : String; 

// //Terms & Conditions Compared with
// Number_of_Back_to_back_Terms_agreed_with_Vendor_as_per_GPC_OR_GCC : String;
//    Details_of_deviated_or_better_terms_agreed_with_the_Vendor : String;
//    Market_Scenario_and_Demand : String;
//    Companys_Position_and_Market_dynamics_of_this_purchase:String;
//    Should_Be_Cost_estimated : String;
//    Highlights_of_this_proposal_and_Price_Justification_for_this_proposal:String;
//    Price_Escalation_Agreed_if_any : String;
//    Particulars_of_any_Free_Service_OR_Supply_Guarantees_OR_Warrant_yfrom_Vendor:String;
//    Transportation : String;
//    Logistics_Cost : String;
//    Delivery_Schedule : String;
//    Tax_Details : String;
//    Additional_Remarks : String;
//    ABG : String;
//    ABG_Value : String;
//    CPBG : String;
//    CPBG_Value : String;
//    // OTHERS TERMS AND CONDITIONS

//    Scope_and_Responsibilities : String;
//    Commercial_Terms : String;
//    Compliance_Terms : String;
//    Others :String;
//    //PRICE DETAILS

//    HSN_OR_SAC_Code : String;
//    Item_Code : String;
//    Item_Short_Description : String;
//    UOM : String;
//    Quantity : String;
//    Unit_Price : String;
//    Amount : String;
//    Indian_Tax_PER : String;
//    Quantity_Over_Delivery_Tolerance : String;
ProjectId :String;
number_of_vendors_invited : String;
total_levels_of_approval : String(2);
Current_level_of_approval : String(2);
Sap_workitem_id:String;

Comments : LargeString;
submitted_by :String;
submitted_date :String;
   tab1totab2 : Composition of many PAN_WEB_EVENT on tab1totab2.tab2totab1 = $self;
    tab1totab3 : Composition of many PAN_TYPE on tab1totab3.tab3totab1 = $self;
//    tab1tovendor_response_summary_table : Composition of many vendor_data on tab1tovendor_response_summary_table.vendor_response_summary_tabletotab1 = $self;
//    tab1toPAYMENT_TERM_DETAILS : Composition of many PAYMENT_TERM_DETAILS on tab1toPAYMENT_TERM_DETAILS.PAYMENT_TERM_DETAILStotab1 = $self;
   tab1toWORKFLOW_HISTORY : Composition of many PAN_WORKFLOW_HISTORY on tab1toWORKFLOW_HISTORY.WORKFLOW_HISTORYtotab1 = $self;
   tab1topdf : Association to many PAN_attachments on tab1topdf.PAN_Number =PAN_Number;
     tab1tovendor_data : Composition of many PAN_vendor_data on tab1tovendor_data.vendor_datatotab1 = $self;
    tab1tocom : Composition of many PAN_Comments on tab1tocom.comtotab1 = $self;
}

// PAN_RA_Details changed as PAN_WEB_EVENT

@cds.persistance.exists
entity  PAN_WEB_EVENT{
key idd : String;
key PAN_Number : String;
eventNo : String;
number:String;
date:String;
numberOfVendorsParticipated :String;
l1AmountObtained : String;
// First_Publish_Data_DASH_same_as_sr_no_28 : String; 
// Last_Publish_data_before_RA : String; 
// RA_Data : String; 
// Techanical_appropval_data : String; 
// Client_approval_data : String;
tab2totab1 : Association to one PAN_Details on tab2totab1.PAN_Number = PAN_Number; 
}

@cds.persistance.exists
entity  PAN_TYPE{
key idd : String;
key PAN_Number : String;
typeNo: String;
required:String;
submittedOn:String;
receivedOn:String;
timeTakenForApproval:String;
tab3totab1 : Association to one PAN_Details on tab3totab1.PAN_Number = PAN_Number; 
}

@cds.persistance.exists
entity PAN_vendor_data {
    //vendor response summary table
key Proposed_Vendor_Code : String; //disp
key PAN_Number : String;

Awarded_Vendor : String; 
Vendor_Name : String;  //disp
Vendor_Location : String; 
Technically_Approved : String; 
Client_Approved : String;  
Original_quote : String;  //disp
Final_Quote : String;  //disp
Order_amount_OR_Split_order_amount : String;  
Discount_Amount : String;  
Discount_percentage : String;  
Rank : String; 
Proposed_Vendor_Name : String; 
Supplier_Origin_State : String; 
Destination_State_BKTShipDASHto_LocationBKT : String; 
Vendor_GST_Number : String; 
Vendor_CE_Score : String; 
Vendor_CE_Date : String; 
Vendor_PE_Score : String; 
Vendor_PE_Date : String; 
Vendor_Contact_PersonDASH1 : String; 
Vendor_Contact_PersonDASH2 : String; 
Technical_Committee_who_cleared_the_proposal : String; 
Commercial_Committee_who_cleared_the_proposal : String; 
Vendor_References_to_be_displayed_in_Order : String; 
Shortlisted_Vendors_Response_summary : String; 
   Order_Value_BKTIn_Project_CurrencyBKT : String;
Order_Value_BKTIn_Bid_CurrencyBKT : String;
Vendor_Final_Quotation_Date : String;
Vendor_Final_Quotation_Amount : String;
Project_CurrencyORBase_Currency : String;
Order_CurrencyORBid_currency : String;
Incoterms : String; 
//Terms_and_Conditions_Compared_with
Number_of_Back_to_back_Terms_agreed_with_Vendor_as_per_GPC_OR_GCC : String;
   Details_of_deviated_or_better_terms_agreed_with_the_Vendor : String;
   Market_Scenario_and_Demand : String;
   Companys_Position_and_Market_dynamics_of_this_purchase:String;
   Should_Be_Cost_estimated : String;
   Highlights_of_this_proposal_and_Price_Justification_for_this_proposal:String;
   Price_Escalation_Agreed_if_any : String;
   Particulars_of_any_Free_Service_OR_Supply_Guarantees_OR_Warrant_yfrom_Vendor:String;
   Transportation : String;
   Logistics_Cost : String;
   Delivery_Schedule : String;
   Tax_Details : String;
   Additional_Remarks : String;
   ABG : String;
   ABG_Value : String;
   CPBG : String;
   CPBG_Value : String;
 // OTHERS TERMS AND CONDITIONS

   Scope_and_Responsibilities : LargeString;
   Commercial_Terms : LargeString;
   Compliance_Terms : LargeString;
   Others :LargeString;
vendtovenr :  Composition of many PAN_vendor_response on vendtovenr.venrtovend = $self ;
// vendtotnc :  Composition of many Terms_and_Conditions_Compared_with on vendtotnc.tnctovend = $self;
vendtoptd:  Composition of many PAN_PAYMENT_TERM_DETAILS on vendtoptd.ptdtovend = $self;
vendtopd:  Composition of many PAN_PRICE_DETAILS on vendtopd.pdtovend = $self  ;
vendor_datatotab1 :  Association to one PAN_Details on vendor_datatotab1.PAN_Number =  PAN_Number ; 

// vendor_response_summary_tabletotab1 : Association to one tab1 on vendor_response_summary_tabletotab1.id = idd; 
}






@cds.persistance.exists
entity PAN_vendor_response{
    
key Proposed_Vendor_Code : String; 
    key  PAN_Number : String;
  
Proposed_Vendor_Name : String; 
Supplier_Origin_State : String; 
Destination_State_BKTShipDASHto_LocationBKT : String; 
Vendor_GST_Number : String; 
Vendor_CE_Score : String; 
Vendor_CE_Date : Date; 
Vendor_PE_Score : String; 
Vendor_PE_Date : Date; 
Vendor_Contact_PersonDASH1 : String; 
Vendor_Contact_PersonDASH2 : String; 
Technical_Committee_who_cleared_the_proposal : String; 
Commercial_Committee_who_cleared_the_proposal : String; 
Vendor_References_to_be_displayed_in_Order : String; 
Shortlisted_Vendors_Response_summary : String; 
   Order_Value_BKTIn_Project_CurrencyBKT : String;
Order_Value_BKTIn_Bid_CurrencyBKT : String;
Vendor_Final_Quotation_Date : String;
Vendor_Final_Quotation_Amount : String;
Project_CurrencyORBase_Currency : String;
Order_CurrencyORBid_currency : String;
Incoterms : String; 
//Terms_and_Conditions_Compared_with
Number_of_Back_to_back_Terms_agreed_with_Vendor_as_per_GPC_OR_GCC : String;
   Details_of_deviated_or_better_terms_agreed_with_the_Vendor : String;
   Market_Scenario_and_Demand : String;
   Companys_Position_and_Market_dynamics_of_this_purchase:String;
   Should_Be_Cost_estimated : String;
   Highlights_of_this_proposal_and_Price_Justification_for_this_proposal:String;
   Price_Escalation_Agreed_if_any : String;
   Particulars_of_any_Free_Service_OR_Supply_Guarantees_OR_Warrant_yfrom_Vendor:String;
   Transportation : String;
   Logistics_Cost : String;
   Delivery_Schedule : String;
   Tax_Details : String;
   Additional_Remarks : String;
   ABG : String;
   ABG_Value : String;
   CPBG : String;
   CPBG_Value : String;
 // OTHERS TERMS AND CONDITIONS

   Scope_and_Responsibilities : LargeString;
   Commercial_Terms : LargeString;
   Compliance_Terms : LargeString;
   Others :LargeString;
    

 
   venrtovend :  Association to one PAN_vendor_data;// on venrtovend.Proposed_Vendor_Code =  Proposed_Vendor_Code and venrtovend.PAN_Number = PAN_Number; 
 }
 

@cds.persistance.exists
entity PAN_PAYMENT_TERM_DETAILS {
          
key ptdkey:UUID;
Proposed_Vendor_Code : String; 
PAN_Number : String;
    iddd : String;
   
   
   slNo:Integer;
  Payment_methord : String default'RTGS payment';
  //  ADVANCE : String;
  //  Progress : String;
  //  Retention : String;
   Percentage : String;
   Description:String;
   Due_date:String;
   Mandatory_Documents_OR_Submissions : String;
   To_be_certified_in_Company : String;
//    percentage_payment_for_progress : String;
// percentage_payment_for_retention :String;

   ptdtovend : Association to PAN_vendor_data on ptdtovend.Proposed_Vendor_Code=Proposed_Vendor_Code and PAN_Number = ptdtovend.PAN_Number; 
//    PAYMENT_TERM_DETAILStotab1 :  Association to one tab1 on PAYMENT_TERM_DETAILStotab1.id = idd; 
}


@cds.persistance.exists
entity PAN_attachments:cuid,managed{
  //  key idd : UUID;
   key PAN_Number : String;
  // key pdfId : UUID default '10';
    // @Core.MediaType: mediaType
    // contentB: LargeBinary;
    @Core.MediaType: mediaType
    content: LargeBinary;
    @Core.IsMediaType: true
    mediaType: String;
    fileName: String;
    size: Integer;
    url: String;
    pdftotab1 : Association to one PAN_Details on pdftotab1.PAN_Number = PAN_Number;
}



@cds.persistance.exists
entity PAN_WORKFLOW_HISTORY { 
   key idd : String;
   key PAN_Number :String;
     Employee_ID : String;
   level : String;
  Approved_by: String;
  Employee_Name : String;
    Title : String;
    
    
    Notification_Status : String;
    Result : String;
    Begin_DateAND_Time: String;
    End_DateAND_Time: String;
    Days_Taken : String;
    Remarks : String;
    WORKFLOW_HISTORYtotab1 :  Association to one PAN_Details on WORKFLOW_HISTORYtotab1.PAN_Number = PAN_Number; 
}





@cds.persistance.exists
entity PAN_PRICE_DETAILS{
  key pdkey:UUID;
   Proposed_Vendor_Code : String; 
    PAN_Number : String;
   Item_Code : String;
  
    HSN_OR_SAC_Code : String;
   
   extendedPrice:String;
   Item_Short_Description : String;
   UOM : String;
   Quantity : String;
   Unit_Price : String;
   Amount : String;
   Indian_Tax_PER : String;
   Quantity_Over_Delivery_Tolerance : String;
   pdtovend : Association to PAN_vendor_data on pdtovend.Proposed_Vendor_Code = Proposed_Vendor_Code and  PAN_Number = pdtovend.PAN_Number;
}


@cds.persistance.exists
entity PAN_Payment_Method_Drop {
  
  key id :UUID;
  Payment_method :String;
  
}

@cds.persistance.exists
entity PAN_Comments:managed{
  key idd : UUID;
  key PAN_Number : String;
  user :String;
  Comments : LargeString; 
  status:String;
  comtotab1:Association to one PAN_Details on comtotab1.PAN_Number = PAN_Number;
}
@cds.persistance.exists
entity vendorTaxDetails{
  key Proposed_Vendor_Code : String; 
  key  PAN_Number : String;
  key Item_Code : String;
  key idd :UUID;
  name :String;
  value :String;
}


