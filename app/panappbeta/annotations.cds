using CatalogService as service from '../../srv/service';

  

annotate service.tab1 with @(
    UI.CreateHidden : true,
    UI.DeleteHidden :true,
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : PAN_Number,
            Label : 'NFA Number',
        },
        {
            $Type : 'UI.DataField',
            Value : BUORPurchasing_Group,
            Label : 'BU/Purchasing Group',
        },{
            $Type : 'UI.DataField',
            Value : Plant_Code,
            Label : 'Plant Code',
        },
        {
            $Type : 'UI.DataField',
            Value : status,
            Label : 'Status',
            Criticality : statusInd,
            CriticalityRepresentation : #WithIcon,

        },],
    UI.SelectionPresentationVariant #tableView : {
    
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Table View',
    },
    UI.LineItem #tableView : [
    ],
    UI.SelectionPresentationVariant #tableView1 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Table View 1',
    }
);
annotate service.tab1 with @(
    UI.HeaderInfo:{
        TypeName:'NFA Details',
        TypeNamePlural:'NFA Details',
        Title:{
            $Type:'UI.DataField',
            Value:PAN_Number
        }
    },
    UI.Facets : [
        {
            $Type : 'UI.CollectionFacet',
            Label : 'General Details',
            ID : 'GeneralDetails1',
            Facets : [
            {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneralDetails',
            Target : '@UI.FieldGroup#GeneralDetails',
        },
                {
            $Type : 'UI.ReferenceFacet',
            Label : 'EVENT HISTORY',
            ID : '_',
            Target : 'tab1totab2/@UI.LineItem#_',
        },
                ],
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Vendor Response Details',
            ID : 'VendorData',
            Target : 'tab1tovendor_data/@UI.LineItem#VendorData',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Justification',
            ID : 'Justification',
            Target : '@UI.FieldGroup#Justification',
        },
    ],
    UI.FieldGroup #GeneralDetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : PAN_Number,
                Label : 'NFA Number',
            },{
                $Type : 'UI.DataField',
                Value : BUORPurchasing_Group,
                Label : 'BU/Purchasing Group',
            },{
                $Type : 'UI.DataField',
                Value : Plant_Code,
                Label : 'Plant Code',
            },{
                $Type : 'UI.DataField',
                Value : Project_Description,
                Label : 'Project Description',
            },{
                $Type : 'UI.DataField',
                Value : PR_NumberBKTsBKT,
                Label : 'PR Number(s)',
            },{
                $Type : 'UI.DataField',
                Value : Subject_of_ProposalOROrder,
                Label : 'Subject of Proposal/Order',
            },{
                $Type : 'UI.DataField',
                Value : Split_OrderORNo_of_vendors,
                Label : 'Split Order/No of vendors',
            },{
                $Type : 'UI.DataField',
                Value : Order_Location_OR_Plant,
                Label : 'Order Location / Plant',
            },{
                $Type : 'UI.DataField',
                Value : Base_line_spend,
                Label : 'Base line spend',
            },{
                $Type : 'UI.DataField',
                Value : Project_CurrencyORBase_Currency,
                Label : 'Project Currency/Base Currency',
            },{
                $Type : 'UI.DataField',
                Value : Order_CurrencyORBid_currency,
                Label : 'Order Currency/Bid currency',
            },{
                $Type : 'UI.DataField',
                Value : Final_proposed_Value,
                Label : 'Final proposed Value',
            },{
                $Type : 'UI.DataField',
                Value : Savings_achieved_btw_initial_and_final_quote,
                Label : 'Savings achieved btw initial and final quote',
            },{
                $Type : 'UI.DataField',
                Value : Savings_against_base_line_spend_of_RFP,
                Label : 'Savings against base line spend of RFP',
            },{
                $Type : 'UI.DataField',
                Value : Number_of_Vendors_Shortlisted_for_RFP,
                Label : 'Number of Vendors Shortlisted for RFP',
            },{
                $Type : 'UI.DataField',
                Value : RFP_Number,
                Label : 'RFP Number',
            },{
                $Type : 'UI.DataField',
                Value : RFP_Publish_Date,
                Label : 'RFP Publish Date',
            },{
                $Type : 'UI.DataField',
                Value : Time_Taken_for_FinalizationDASHIn_DAYS,
                Label : 'Time Taken for Finalization-In DAYS',
            },{
                $Type : 'UI.DataField',
                Value : status,
                Label : 'status',
                ![@UI.Hidden],
            },
            {
                $Type : 'UI.DataField',
                Value : number_of_vendors_invited,
                Label : 'Number Of Vendors Invited',
            },],
    }
);
annotate service.tab1 with @Common.SemanticKey : [ PAN_Number];
annotate service.vendor_data with @(
    UI.CreateHidden:true,
    UI.DeleteHidden:true,
    UI.LineItem #VendorData : [
        {
            $Type : 'UI.DataField',
            Value : Awarded_Vendor,
            Label : 'Awarded Vendor',
        },
        {
            $Type : 'UI.DataField',
            Value : Vendor_Name,
            Label : 'Vendor Name',
        },
        {
            $Type : 'UI.DataField',
            Value : Original_quote,
            Label : 'Original quote',
        },{
            $Type : 'UI.DataField',
            Value : Final_Quote,
            Label : 'Final Quote',
        },
        {
            $Type : 'UI.DataField',
            Value : Vendor_Location,
            Label : 'Awarded Value',
        },
        {
            $Type : 'UI.DataField',
            Value : Order_amount_OR_Split_order_amount,
            Label : 'Order amount OR Split order amount',
        },
        {
            $Type : 'UI.DataField',
            Value : Discount_Amount,
            Label : 'Discount Amount',
        },
        {
            $Type : 'UI.DataField',
            Value : Discount_percentage,
            Label : 'Discount percentage',
        },
        {
            $Type : 'UI.DataField',
            Value : Rank,
            Label : 'Rank',
        },]
);
annotate service.attachments with @(
    UI.CreateHidden:true,
    UI.DeleteHidden:true,
    UI.LineItem #ATTACHMENTSINTERNALTOPANFORAPPROVERS : [
        {
            $Type : 'UI.DataField',
            Value : content,
            Label : 'FILES',
        },]
);

annotate service.attachments with @(UI.FieldGroup #filecontent: {Data: [
    {
        $Type: 'UI.DataField',
        Value: content,
        Label: 'content',
        
    }
]});

annotate service.attachments with @(UI.LineItem #attachments: [
   
    {
        $Type: 'UI.DataFieldForAnnotation',
       Target:'@UI.FieldGroup#filecontent',
        Label: 'content',
    },
    
]);


annotate service.tab1 with @(
    UI.FieldGroup #Justification : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : Comments,
                Label : 'Comments',
            },],
    }
);
annotate service.WORKFLOW_HISTORY with @(
    UI.CreateHidden:true,
    UI.DeleteHidden:true,
    UI.LineItem #WORKFLOWHISTORY : [
        {
            $Type : 'UI.DataField',
            Value : level,
            Label : 'level',
        },
        {
            $Type : 'UI.DataField',
            Value : Title,
            Label : 'Title',
        },
        {
            $Type : 'UI.DataField',
            Value : Employee_ID,
            Label : 'Employee_ID',
        },
        {
            $Type : 'UI.DataField',
            Value : Employee_Name,
            Label : 'Employee_Name',
        },
        {
            $Type : 'UI.DataField',
            Value : Result,
            Label : 'Result',
        },{
            $Type : 'UI.DataField',
            Value : Begin_DateAND_Time,
            Label : 'Begin Date& Time',
        },{
            $Type : 'UI.DataField',
            Value : End_DateAND_Time,
            Label : 'End Date& Time',
        },{
            $Type : 'UI.DataField',
            Value : Days_Taken,
            Label : 'Days Taken',
        },{
            $Type : 'UI.DataField',
            Value : Remarks,
            Label : 'Remarks',
        },
        {
            $Type : 'UI.DataField',
            Value : Approved_by,
            Label : 'Approved_by',
        },]
);
annotate service.vendor_data with @(
    // UI.DeleteHidden:true,
    UI.HeaderInfo:{
        TypeName:'Vendor Details',
        TypeNamePlural:'Vendor Details',
          Title:{
            $Type:'UI.DataField',
            Value:Proposed_Vendor_Code
        },
        Description:{
            $Type:'UI.DataField',
            Value:Vendor_Name
        }
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Vendor Response',
            ID : 'VendorResponse',
            Target : '@UI.FieldGroup#VendorResponse',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Payment Term Details',
            ID : 'PAYMENT_TERM_DETAILS',
            Target : 'vendtoptd/@UI.LineItem#PAYMENT_TERM_DETAILS',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Terms And Conditions',
            ID : 'OTHERSTERMSANDCONDITIONS',
            Target : '@UI.FieldGroup#OTHERSTERMSANDCONDITIONS',
        },
         {
            $Type : 'UI.ReferenceFacet',
            Label : 'Item Details',
            ID : 'PRICEDETAILS',
            Target : 'vendtopd/@UI.LineItem#PAN_PRICE_DETAILS',
        },
    ],
    UI.FieldGroup #VendorResponse : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : Proposed_Vendor_Name,
                Label : 'Proposed Vendor Name',
            },{
                $Type : 'UI.DataField',
                Value : Supplier_Origin_State,
                Label : 'Supplier Origin State',
            },{
                $Type : 'UI.DataField',
                Value : Destination_State_BKTShipDASHto_LocationBKT,
                Label : 'Destination State (Ship-to Location)',
            },{
                $Type : 'UI.DataField',
                Value : Vendor_GST_Number,
                Label : 'Vendor GST Number',
            },{
                $Type : 'UI.DataField',
                Value : Vendor_Contact_PersonDASH1,
                Label : 'Vendor Contact Person 1',
            },{
                $Type : 'UI.DataField',
                Value : Vendor_Contact_PersonDASH2,
                Label : 'Vendor Contact Person 2',
            },{
                $Type : 'UI.DataField',
                Value : Technical_Committee_who_cleared_the_proposal,
                Label : 'Technical Committee who cleared the proposal',
            },{
                $Type : 'UI.DataField',
                Value : Commercial_Committee_who_cleared_the_proposal,
                Label : 'Commercial Committee who cleared the proposal',
            },{
                $Type : 'UI.DataField',
                Value : Incoterms,
                Label : 'Incoterms',
            },
            {
                $Type : 'UI.DataField',
                Value : Order_Value_BKTIn_Bid_CurrencyBKT,
                Label : 'Order Value (In Bid Currency)',
            },
            {
                $Type : 'UI.DataField',
                Value : Order_Value_BKTIn_Project_CurrencyBKT,
                Label : 'Order Value (In Project Currency)',
            },
            {
                $Type : 'UI.DataField',
                Value : Vendor_Final_Quotation_Amount,
                Label : 'Vendor Final Quotation Amount',
            },
            {
                $Type : 'UI.DataField',
                Value : Vendor_Final_Quotation_Date,
                Label : 'Vendor Final Quotation Date',
            },{
                $Type : 'UI.DataField',
                Value : Project_CurrencyORBase_Currency,
                Label : 'Project Currency/Base Currency',
            },{
                $Type : 'UI.DataField',
                Value : Order_CurrencyORBid_currency,
                Label : 'Order Currency/Bid Currency',
            },],
    }
);
annotate service.vendor_data with @(
    UI.FieldGroup #TermsandConditionsComparedwith : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : Number_of_Back_to_back_Terms_agreed_with_Vendor_as_per_GPC_OR_GCC,
                Label : 'Number of Back to back Terms agreed with Vendor as per GPC / GCC',
            },{
                $Type : 'UI.DataField',
                Value : Details_of_deviated_or_better_terms_agreed_with_the_Vendor,
                Label : 'Details of deviated or better terms agreed with the Vendor',
            },{
                $Type : 'UI.DataField',
                Value : Market_Scenario_and_Demand,
                Label : 'Market Scenario and Demand',
            },{
                $Type : 'UI.DataField',
                Value : Companys_Position_and_Market_dynamics_of_this_purchase,
                Label : 'Companys Position and Market dynamics of this purchase',
            },{
                $Type : 'UI.DataField',
                Value : Should_Be_Cost_estimated,
                Label : 'Should Be Cost estimated',
            },{
                $Type : 'UI.DataField',
                Value : Highlights_of_this_proposal_and_Price_Justification_for_this_proposal,
                Label : 'Highlights of this proposal and Price Justification for this proposal',
            },{
                $Type : 'UI.DataField',
                Value : Price_Escalation_Agreed_if_any,
                Label : 'Price Escalation Agreed if any',
            },{
                $Type : 'UI.DataField',
                Value : Particulars_of_any_Free_Service_OR_Supply_Guarantees_OR_Warrant_yfrom_Vendor,
                Label : 'Particulars of any Free Service / Supply Guarantees / Warrant yfrom Vendor',
            },{
                $Type : 'UI.DataField',
                Value : Transportation,
                Label : 'Transportation',
            },{
                $Type : 'UI.DataField',
                Value : Logistics_Cost,
                Label : 'Logistics Cost',
            },{
                $Type : 'UI.DataField',
                Value : Delivery_Schedule,
                Label : 'Delivery Schedule',
            },{
                $Type : 'UI.DataField',
                Value : Tax_Details,
                Label : 'Tax Details',
            },{
                $Type : 'UI.DataField',
                Value : Additional_Remarks,
                Label : 'Additional Remarks',
            },{
                $Type : 'UI.DataField',
                Value : ABG,
                Label : 'ABG',
            },{
                $Type : 'UI.DataField',
                Value : ABG_Value,
                Label : 'ABG Value',
            },{
                $Type : 'UI.DataField',
                Value : CPBG,
                Label : 'CPBG',
            },{
                $Type : 'UI.DataField',
                Value : CPBG_Value,
                Label : 'CPBG Value',
            },],
    }
);

annotate service.PAYMENT_TERM_DETAILS with @UI.PresentationVariant: {
    Visualizations: ['@UI.LineItem#PAYMENT_TERM_DETAILS'],
    SortOrder     : [
        {
            $Type     : 'Common.SortOrderType',
            Property  : slNo,
            Descending: true
        }
    ],
    
};
annotate service.PAYMENT_TERM_DETAILS with @(
    UI.CreateHidden:true,
    UI.DeleteHidden:true,
     UI.LineItem #PAYMENT_TERM_DETAILS : [
        {
            $Type : 'UI.DataField',
            Value : slNo,
            Label : 'slNo',
            ![@UI.Hidden],
        },
         {
            $Type : 'UI.DataField',
            Value : iddd,
            Label : 'Payment Terms',
        },{
            $Type : 'UI.DataField',
            Value : Percentage,
            Label : 'Percentage',
        },{
            $Type : 'UI.DataField',
            Value : Description,
            Label : 'Description',
        },{
            $Type : 'UI.DataField',
            Value : Due_date,
            Label : 'Due date',
        },{
            $Type : 'UI.DataField',
            Value : Mandatory_Documents_OR_Submissions,
            Label : 'Mandatory Documents / Submissions',
        },{
            $Type : 'UI.DataField',
            Value : To_be_certified_in_Company,
            Label : 'To be Certified in Company',
        },{
            $Type : 'UI.DataField',
            Value :    Payment_methord,
            Label : 'Payment Methord',
        },
        ]
);
annotate service.PAYMENT_TERM_DETAILS with {
       percentage_payment_for_progress @Common.FieldControl : #ReadOnly
};
annotate service.PAYMENT_TERM_DETAILS with {
percentage_payment_for_retention  @Common.FieldControl : #ReadOnly
};
annotate service.vendor_data with @(
    UI.FieldGroup #OTHERSTERMSANDCONDITIONS : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : Scope_and_Responsibilities,
                Label : 'Scope and Responsibilities',
            },{
                $Type : 'UI.DataField',
                Value : Commercial_Terms,
                Label : 'Commercial Terms',
            },{
                $Type : 'UI.DataField',
                Value : Compliance_Terms,
                Label : 'Compliance Terms',
            },{
                $Type : 'UI.DataField',
                Value : Others,
                Label : 'Others',
            },],
    }
);
// annotate service.vendor_data with @(
//     UI.FieldGroup #PRICEDETAILS : {
//         $Type : 'UI.FieldGroupType',
//         Data : [
//             {
//                 $Type : 'UI.DataField',
//                 Value : HSN_OR_SAC_Code,
//                 Label : 'HSN / SAC Code',
//             },{
//                 $Type : 'UI.DataField',
//                 Value : Item_Code,
//                 Label : 'Item Code',
//             },{
//                 $Type : 'UI.DataField',
//                 Value : Item_Short_Description,
//                 Label : 'Item Short Description',
//             },{
//                 $Type : 'UI.DataField',
//                 Value : UOM,
//                 Label : 'UOM',
//             },{
//                 $Type : 'UI.DataField',
//                 Value : Quantity,
//                 Label : 'Quantity',
//             },{
//                 $Type : 'UI.DataField',
//                 Value : Unit_Price,
//                 Label : 'Unit Price',
//             },{
//                 $Type : 'UI.DataField',
//                 Value : Amount,
//                 Label : 'Amount',
//             },{
//                 $Type : 'UI.DataField',
//                 Value : Indian_Tax_PER,
//                 Label : 'Indian Tax PER',
//             },{
//                 $Type : 'UI.DataField',
//                 Value : Quantity_Over_Delivery_Tolerance,
//                 Label : 'Quantity Over Delivery Tolerance',
//             },],
//     }
// );
annotate service.tab1 with {
    PAN_Number @Common.FieldControl : #ReadOnly
};
annotate service.tab1 with {
    SBG @Common.FieldControl : #ReadOnly
};
annotate service.tab1 with {
    SBU @Common.FieldControl : #ReadOnly
};
annotate service.tab1 with {
    BUORPurchasing_Group @Common.FieldControl : #ReadOnly
};
annotate service.tab1 with {
    Plant_Code @Common.FieldControl : #ReadOnly
};
annotate service.tab1 with {
    PR_NumberBKTsBKT @Common.FieldControl : #ReadOnly
};
annotate service.tab1 with {
    Split_OrderORNo_of_vendors @Common.FieldControl : #ReadOnly
};
annotate service.tab1 with {
    Base_line_spend @Common.FieldControl : #ReadOnly
};
annotate service.tab1 with {
    Project_CurrencyORBase_Currency @Common.FieldControl : #ReadOnly
};
annotate service.tab1 with {
    Order_CurrencyORBid_currency @Common.FieldControl : #ReadOnly
};
annotate service.tab1 with {
    Final_proposed_Value @Common.FieldControl : #ReadOnly
};
annotate service.tab1 with {
    Order_Value_BKTIn_Project_CurrencyBKT @Common.FieldControl : #ReadOnly
};
annotate service.tab1 with {
    Order_Value_BKTIn_Bid_CurrencyBKT @Common.FieldControl : #ReadOnly
};
annotate service.tab1 with {
    Savings_achieved_btw_initial_and_final_quote @Common.FieldControl : #Optional
};
annotate service.tab1 with {
    Savings_against_base_line_spend_of_RFP @Common.FieldControl : #ReadOnly
};
annotate service.tab1 with {
    Number_of_Vendors_Shortlisted_for_RFP @Common.FieldControl : #ReadOnly
};
annotate service.tab1 with {
    RFP_Number @Common.FieldControl : #ReadOnly
};
annotate service.tab1 with {
    RFP_Publish_Date @Common.FieldControl : #ReadOnly
};
annotate service.tab1 with {
    Vendor_Final_Quotation_Amount @Common.FieldControl : #ReadOnly
};
annotate service.vendor_data with {
    Vendor_Name @Common.FieldControl : #ReadOnly
};
annotate service.vendor_data with {
    Proposed_Vendor_Code @Common.FieldControl : #ReadOnly
};
annotate service.vendor_data with {
    Original_quote @Common.FieldControl : #ReadOnly
};
annotate service.vendor_data with {
    Final_Quote @Common.FieldControl : #ReadOnly
};
annotate service.vendor_data with {
    Proposed_Vendor_Name @Common.FieldControl : #ReadOnly
};
annotate service.vendor_data with {
    Destination_State_BKTShipDASHto_LocationBKT @Common.FieldControl : #ReadOnly
};
annotate service.vendor_data with {
    Vendor_GST_Number @Common.FieldControl : #ReadOnly
};
annotate service.vendor_data with {
    Shortlisted_Vendors_Response_summary @Common.FieldControl : #ReadOnly
};
annotate service.vendor_data with {
    Incoterms @Common.FieldControl : #ReadOnly
};
annotate service.vendor_data with {
    ABG @Common.FieldControl : #ReadOnly
};
annotate service.vendor_data with {
    CPBG @Common.FieldControl : #ReadOnly
};
annotate service.PAYMENT_TERM_DETAILS with {
    Payment_Type @Common.FieldControl : #ReadOnly
};
annotate service.PAYMENT_TERM_DETAILS with {
    ADVANCE @Common.FieldControl : #ReadOnly
};
annotate service.PAYMENT_TERM_DETAILS with {
    Progress @Common.FieldControl : #ReadOnly
};
annotate service.PAYMENT_TERM_DETAILS with {
    Retention @Common.FieldControl : #ReadOnly
};
annotate service.PAYMENT_TERM_DETAILS with {
    Percentage_Total @Common.FieldControl : #ReadOnly
};
annotate service.PAYMENT_TERM_DETAILS with {
    Percentage_Payment @Common.FieldControl : #ReadOnly
};
annotate service.vendor_data with {
    Scope_and_Responsibilities @Common.FieldControl : #ReadOnly
};
annotate service.vendor_data with {
    Commercial_Terms @Common.FieldControl : #ReadOnly
};
annotate service.vendor_data with {
    Compliance_Terms @Common.FieldControl : #ReadOnly
};
annotate service.vendor_data with {
    Others @Common.FieldControl : #ReadOnly
};
annotate service.PAN_PRICE_DETAILS with {
    HSN_OR_SAC_Code @Common.FieldControl : #ReadOnly
};
annotate service.PAN_PRICE_DETAILS with {
    Item_Code @Common.FieldControl : #ReadOnly
};
annotate service.PAN_PRICE_DETAILS with {
    Item_Short_Description @Common.FieldControl : #ReadOnly
};
annotate service.PAN_PRICE_DETAILS with {
    UOM @Common.FieldControl : #ReadOnly
};
annotate service.PAN_PRICE_DETAILS with {
    Quantity @Common.FieldControl : #ReadOnly
};
annotate service.PAN_PRICE_DETAILS with {
    Unit_Price @Common.FieldControl : #ReadOnly
};
annotate service.PAN_PRICE_DETAILS with {
    Amount @Common.FieldControl : #ReadOnly
};
annotate service.PAN_PRICE_DETAILS with {
    Indian_Tax_PER @Common.FieldControl : #ReadOnly
};
annotate service.PAYMENT_TERM_DETAILS with {
    To_be_certified_in_Company_by @Common.FieldControl : #Mandatory
};
annotate service.PAYMENT_TERM_DETAILS with {
    Mandatory_Documents_OR_Submissions_for_Progress @Common.FieldControl : #Mandatory
};

annotate service.vendor_data with {
    Vendor_Contact_PersonDASH1 @Common.FieldControl : #Mandatory
};
annotate service.tab1 with {
    Project_Description @Common.FieldControl : #Mandatory
};
annotate service.tab1 with {
    Subject_of_ProposalOROrder @Common.FieldControl : #Mandatory
};
annotate service.tab1 with {
    justification @Common.FieldControl : #Optional
};
annotate service.tab2 with @(
    UI.LineItem #_ : [
        {
            $Type : 'UI.DataField',
            Value : eventNo,
            Label : 'Event No',
        },{
            $Type : 'UI.DataField',
            Value : number,
            Label : 'Doc ID',
        },{
            $Type : 'UI.DataField',
            Value : date,
            Label : 'DATE',
        },{
            $Type : 'UI.DataField',
            Value : numberOfVendorsParticipated,
            Label : 'Number Of Vendors Participated',
        },{
            $Type : 'UI.DataField',
            Value : l1AmountObtained,
            Label : 'L1 Amount Obtained',
        },]
);
annotate service.WORKFLOW_HISTORY with {
    Title @Common.FieldControl : #ReadOnly
};
// annotate service.WORKFLOW_HISTORY_EMP with {
//     Employee_ID @Common.FieldControl : #ReadOnly
// };
// annotate service.WORKFLOW_HISTORY_EMP with {
//     Employee_Name @Common.FieldControl : #ReadOnly
// };
annotate service.WORKFLOW_HISTORY with {
    Notification_Status @Common.FieldControl : #ReadOnly
};
annotate service.WORKFLOW_HISTORY with {
    Result @Common.FieldControl : #ReadOnly
};
annotate service.WORKFLOW_HISTORY with {
    Begin_DateAND_Time @Common.FieldControl : #ReadOnly
};
annotate service.WORKFLOW_HISTORY with {
    End_DateAND_Time @Common.FieldControl : #ReadOnly
};
annotate service.WORKFLOW_HISTORY with {
    Days_Taken @Common.FieldControl : #ReadOnly
};
annotate service.WORKFLOW_HISTORY with {
    Remarks @Common.FieldControl : #ReadOnly
};
annotate service.vendor_data with {
    Scope_and_Responsibilities @UI.MultiLineText : true
};
annotate service.vendor_data with {
    Commercial_Terms @UI.MultiLineText : true
};
annotate service.vendor_data with {
    Compliance_Terms @UI.MultiLineText : true
};
annotate service.vendor_data with {
    Others @UI.MultiLineText : true
};
annotate service.PAN_PRICE_DETAILS with @(
    UI.CreateHidden:true,
    UI.DeleteHidden:true,
    UI.LineItem #PAN_PRICE_DETAILS : [
        {
            $Type : 'UI.DataField',
            Value : Item_Code,
            Label : 'Item Code',
        },{
            $Type : 'UI.DataField',
            Value : HSN_OR_SAC_Code,
            Label : 'HSN / SAC Code',
        },{
            $Type : 'UI.DataField',
            Value : Item_Short_Description,
            Label : 'Item Short Description',
        },{
            $Type : 'UI.DataField',
            Value : UOM,
            Label : 'UOM',
        },{
            $Type : 'UI.DataField',
            Value : Quantity,
            Label : 'Quantity',
        },{
            $Type : 'UI.DataField',
            Value : Unit_Price,
            Label : 'Unit Price',
        },{
            $Type : 'UI.DataField',
            Value : Amount,
            Label : 'Amount',
        },{
            $Type : 'UI.DataField',
            Value : Indian_Tax_PER,
            Label : 'Tax %',
        },]
);

annotate service.tab3 with @(
    UI.LineItem #TYPE : [
        {
            $Type : 'UI.DataField',
            Value : typeNo,
            Label : 'Type',
        },{
            $Type : 'UI.DataField',
            Value : required,
            Label : 'Required',
        },{
            $Type : 'UI.DataField',
            Value : submittedOn,
            Label : 'Submitted on',
        },{
            $Type : 'UI.DataField',
            Value : receivedOn,
            Label : 'Received on',
        },{
            $Type : 'UI.DataField',
            Value : timeTakenForApproval,
            Label : 'Time Taken for Approval',
        },]
);

annotate service.attachments with {
    contentS @Common.FieldControl: #ReadOnly
};
annotate service.attachments with {
    fileName @Common.FieldControl: #ReadOnly
};
annotate service.attachments with {
    mediaType @Common.FieldControl: #ReadOnly
};
annotate service.tab2 with {
    eventNo @Common.FieldControl : #ReadOnly
};
annotate service.tab2 with {
    number @Common.FieldControl : #ReadOnly
};
annotate service.tab2 with {
    date @Common.FieldControl : #ReadOnly
};
annotate service.tab2 with {
    numberOfVendorsParticipated @Common.FieldControl : #ReadOnly
};
annotate service.tab2 with {
    l1AmountObtained @Common.FieldControl : #ReadOnly
};
annotate service.tab3 with {
    typeNo @Common.FieldControl : #ReadOnly
};
annotate service.tab3 with {
    required @Common.FieldControl : #ReadOnly
};
annotate service.tab3 with {
    submittedOn @Common.FieldControl : #ReadOnly
};
annotate service.tab3 with {
    receivedOn @Common.FieldControl : #ReadOnly
};
annotate service.tab3 with {
    timeTakenForApproval @Common.FieldControl : #ReadOnly
};
annotate service.PAN_Comments with {
    Comments @Common.FieldControl : #Optional
};
annotate service.WORKFLOW_HISTORY with @(
    UI.LineItem #test : [
        {
            $Type : 'UI.DataField',
            Value : level,
            Label : 'level',
        },{
            $Type : 'UI.DataField',
            Value : Employee_ID,
            Label : 'Employee_ID',
        },]
);
annotate service.PAN_Comments with @(
    UI.LineItem #ApprovalComments : [
        {
            $Type : 'UI.DataField',
            Value : Comments,
            Label : 'Comments',
        },]
);

annotate service.tab1 with {
    Comments @UI.MultiLineText : true
};
annotate service.vendor_data with {
    Vendor_Location @Common.FieldControl : #ReadOnly
};
annotate service.vendor_data with {
    Discount_Amount @Common.FieldControl : #ReadOnly
};
annotate service.vendor_data with {
    Discount_percentage @Common.FieldControl : #ReadOnly
};
annotate service.vendor_data with {
    Rank @Common.FieldControl : #ReadOnly
};
annotate service.vendor_data with {
    Awarded_Vendor @Common.FieldControl : #ReadOnly
};
annotate service.vendor_data with {
    Order_amount_OR_Split_order_amount @Common.FieldControl : #ReadOnly
};
annotate service.PAYMENT_TERM_DETAILS with {
    Order_Value_BKTIn_Bid_CurrencyBKT @Common.FieldControl : #ReadOnly
};
annotate service.PAYMENT_TERM_DETAILS with {
    Order_Value_BKTIn_Project_CurrencyBKT @Common.FieldControl : #ReadOnly
};
annotate service.PAYMENT_TERM_DETAILS with {
    Vendor_Final_Quotation_Amount @Common.FieldControl : #ReadOnly
};
annotate service.PAYMENT_TERM_DETAILS with {
    Vendor_Final_Quotation_Date @Common.FieldControl : #ReadOnly
};
annotate service.vendor_data with @(
    UI.HeaderFacets : [],
    UI.FieldGroup #VenorName : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : Vendor_Name,
            },],
    }
);
annotate service.PAYMENT_TERM_DETAILS with {
    iddd @Common.FieldControl : #ReadOnly
};
annotate service.PAYMENT_TERM_DETAILS with {
    Percentage @Common.FieldControl : #ReadOnly
};
annotate service.PAYMENT_TERM_DETAILS with {
    Description @Common.FieldControl : #ReadOnly
};
annotate service.PAYMENT_TERM_DETAILS with {
    Due_date @Common.FieldControl : #ReadOnly
};
annotate service.PAYMENT_TERM_DETAILS with {
    Mandatory_Documents_OR_Submissions @Common.FieldControl : #ReadOnly
};
annotate service.PAYMENT_TERM_DETAILS with {
    To_be_certified_in_Company @Common.FieldControl : #ReadOnly
};
annotate service.PAYMENT_TERM_DETAILS with {
    Payment_methord @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'PAN_Payment_Method_Drop',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : Payment_methord,
                    ValueListProperty : 'Payment_method',
                },
            ],
            Label : 'search_help',
        },
        Common.ValueListWithFixedValues : true
)};

annotate service.tab1 with {
    Comments @Common.FieldControl : #Mandatory
};

