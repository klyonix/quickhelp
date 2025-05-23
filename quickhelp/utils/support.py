# Copyright (c) 2025, KlyONIX Tech Consulting Pvt Ltd and contributors
# For license information, please see license.txt

import frappe
from frappe.utils import cint, flt, get_url, now
from frappe.utils.safe_exec import get_safe_globals, safe_eval
from quickhelp.utils.requests import make_request
from typing import Optional

@frappe.whitelist()
def create_ticket(title: str, raised_by: str, ticket_module: str, description: str) -> str:
    settings = frappe.get_cached_doc("QuickHelp Settings")
    headers = {
        "Authorization": f"token {settings.get_password('support_api_token')}",
    }

    payload = {
        "doc": {
            "description": description,
            "raised_by": raised_by,
            "subject": title,
            "kly_module": ticket_module,
            "customer":settings.project_id,
            # **generate_ticket_details(settings),
        },
    }

    response = make_request(
        url=f"{settings.support_url}/api/method/helpdesk.helpdesk.doctype.hd_ticket.api.new",
        headers=headers,
        payload=payload
    )

    frappe.errprint(response)

    message = response.get("message", {})
    ticket_name = message.get("name")

    if not ticket_name:
        frappe.throw(_("Ticket was not created. Please contact admin."))

    return ticket_name