# coding=utf-8
"""Eleprofile views module.

.. note:: This program is free software; you can redistribute it and/or modify
    it under the terms of the Mozilla Public License 2.0.

"""

__author__ = 'lorenzetti@gis3w.it'
__date__ = '2020-07-09'
__copyright__ = 'Copyright 2015 - 2020, Gis3w'


from django.views.generic import ListView
from .models import EleProProject


class ProjectsListView(ListView):
    """List projecta view."""
    template_name = 'eleprofile/projects_list.html'
    model = EleProProject