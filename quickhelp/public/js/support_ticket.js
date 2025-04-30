// Copyright (c) 2025, KlyONIX Tech Consulting Pvt Ltd and contributors
// For license information, please see license.txt

frappe.provide("quickhelp");

quickhelp.SupportTicket = class {
    constructor() {
        if (!frappe.boot.quickhelp_support_enabled) {
            frappe.msgprint({
                title: __("Support Disabled"),
                message: __("Support is not enabled for this site. Please contact Administrator."),
                indicator: "red"
            });
            return;
        }

        if (frappe.session.user === "Administrator") {
            frappe.msgprint({
                title: __("Access Denied"),
                message: __("Administrator cannot create support tickets."),
                indicator: "orange"
            });
            return;
        }

        this.inUpload = false;
        this.init_config();
        this.setup_dialog();
        this.dialog?.show?.();
    }

    init_config() {
        this.fields = [
            {
                label: "Ticket Title",
                fieldname: "ticket_title",
                fieldtype: "Data",
                reqd: 1,
		placeholder: __("Enter a brief description of the issue"),
		description: __("Summarize the issue in a few words.")
            },
            {
                label: "Module",
                fieldname: "ticket_module",
                fieldtype: "Select",
                options: ["Accounts", "Buying", "Selling", "HR", "Stock", "Projects", "CRM", "Others"],
                reqd: 1,
		placeholder: __("Select the module related to the issue"),
		description: __("Choose the module where the issue is occurring.")
            },
            {
                label: "Description",
                fieldname: "ticket_description",
                fieldtype: "Text Editor",
                reqd: 1,
		placeholder: __("Provide a detailed description of the issue"),
		description: __("<b>Include steps to reproduce, error messages, Screenshots and any other relevant details.<b>")
            }
        ];
    }

    setup_dialog() {
        this.dialog = new frappe.ui.Dialog({
            title: __("Create Support Ticket"),
            fields: this.fields,
            primary_action_label: __("Submit"),
            primary_action: (values) => {
                this.raise_ticket(values);
            }
        });
    }

    async raise_ticket(values) {
        if (this.inUpload) return;

        this.inUpload = true;

        frappe.call({
            method: "quickhelp.utils.support.create_ticket",
            type: "POST",
            args: {
                "title": values.ticket_title,
                "raised_by": frappe.session.user,
                "ticket_module": values.ticket_module,
                "description": values.ticket_description
            },
            freeze: true,
            freeze_message: __("Creating ticket..."),
            callback: (r) => {
                this.inUpload = false;
                // console.log("Create ticket response:", r);

                if (r.message) {
                    frappe.msgprint({
                        title: __("🎫 Ticket Created Successfully"),
                        message: __(`Your ticket (#${r.message}) has been created successfully. You can track it from the Support Portal.`),
                        indicator: "green"
                    });

                    this.dialog?.hide?.();
                }
            },
            error: (err) => {
                this.inUpload = false;
                // console.error("Ticket creation error:", err);
                frappe.show_alert({
                    indicator: "red",
                    message: __("❌ An error occurred while creating the ticket.")
                });
            }
        });
    }
};