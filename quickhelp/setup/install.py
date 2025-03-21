# Copyright (c) 2025, KlyONIX Tech Consulting Pvt Ltd and contributors
# For license information, please see license.txt

from quickhelp.setup.file import create_quickhelp_folder


def after_install():
    create_quickhelp_folder()
