# coding=utf-8
""""
    API views fro eleprofile app.
.. note:: This program is free software; you can redistribute it and/or modify
    it under the terms of the Mozilla Public License 2.0.

"""

__author__ = 'lorenzetti@gis3w.it'
__date__ = '2020-07-14'
__copyright__ = 'Copyright 2015 - 2020, Gis3w'

from django.http.response import JsonResponse
from core.api.base.views import G3WAPIView


class ProfileCalculateApiView(G3WAPIView):
    """
    Make calculation
    """

    # authentication_classes = (
    #     CsrfExemptSessionAuthentication,
    # )
    #
    # permission_classes = (
    #     MakeCDUPermission,
    # )

    def get(self, request, **kwargs):

        return JsonResponse({})