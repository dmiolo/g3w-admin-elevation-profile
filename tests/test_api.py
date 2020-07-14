# coding=utf-8
""""
    Test API eleprofile app.
.. note:: This program is free software; you can redistribute it and/or modify
    it under the terms of the Mozilla Public License 2.0.

"""

__author__ = 'lorenzetti@gis3w.it'
__date__ = '2020-07-14'
__copyright__ = 'Copyright 2015 - 2020, Gis3w'


from django.test import Client
from django.urls import reverse
from .base import EleprofileTestBase

from eleprofile.models import \
    EleProDTM, \
    EleProProject, \
    Layer

import json


class TestAPIViews(EleprofileTestBase):

    def setUp(self):
        self.client = Client()

    def test_initconfig_plugin_start(self):
        """ Test initconfig api"""

        # Create a eleproproject
        epp = EleProProject(project=self.project.instance, note="test note")
        epp.save()

        # Create a DTM layer
        dtm_layer = Layer.objects.get(name='dtm_3857')
        line_layer = Layer.objects.get(name='paths')

        epdtm = EleProDTM(elepro_project=epp, dtm_layer=dtm_layer, note='note dtm layer for update')
        epdtm.save()
        epdtm.layers.add(line_layer)

        # api client instance
        self.assertTrue(self.client.login(
            username=self.test_admin1.username, password=self.test_admin1.username))

        url = reverse('group-map-config',
                      args=[self.project_group.slug, 'qdjango', self.project.instance.pk])

        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        jcontent = json.loads(response.content)

        # check archiweb into plugins section
        self.assertTrue('eleprofile' in jcontent['group']['plugins'])

        plugin = jcontent['group']['plugins']['eleprofile']

        # check gid and TYPES
        self.assertEqual(plugin['gid'], 'qdjango:{}'.format(
            self.project.instance.pk))

        layers = [
            {
                'api': reverse('eleprofile-api-calculate-no-fid', args=[epdtm.pk]),
                'layer_id': line_layer.qgs_layer_id
            }
        ]
        self.assertEqual(plugin['layers'], layers)

        self.client.logout()
