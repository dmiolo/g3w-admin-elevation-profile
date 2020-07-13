# coding=utf-8
""""

.. note:: This program is free software; you can redistribute it and/or modify
    it under the terms of the Mozilla Public License 2.0.

"""

__author__ = 'lorenzetti@gis3w.it'
__date__ = '2020-07-09'
__copyright__ = 'Copyright 2015 - 2020, Gis3w'

from django.urls import path
from django.contrib.auth.decorators import login_required
from base.urls import G3W_SITETREE_I18N_ALIAS
from .views import \
    ProjectsListView, \
    ProjectAddView, \
    ProjectUpdateView, \
    ProjectDeleteView

# For sitree bar translation
G3W_SITETREE_I18N_ALIAS.append('eleprofile')

urlpatterns = [
    path('projects/', login_required(ProjectsListView.as_view()), name='eleprofile-project-list'),
    path('projects/add/', login_required(ProjectAddView.as_view()), name='eleprofile-project-add'),
    path('projects/update/<int:pk>/', login_required(ProjectUpdateView.as_view()), name='eleprofile-project-update'),
    path('projects/delete/<int:pk>/', login_required(ProjectDeleteView.as_view()), name='eleprofile-project-delete'),
]