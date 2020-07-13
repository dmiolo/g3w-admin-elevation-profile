# coding=utf-8
""""
    Test Eleprofile module views.
.. note:: This program is free software; you can redistribute it and/or modify
    it under the terms of the Mozilla Public License 2.0.

"""

__author__ = 'lorenzetti@gis3w.it'
__date__ = '2020-07-13'
__copyright__ = 'Copyright 2015 - 2020, Gis3w'


from django.test import Client
from django.urls import reverse
from .base import EleprofileTestBase

from eleprofile.models import EleProProject


class TestViews(EleprofileTestBase):

    def setUp(self):
        self.client = Client()

    def _test_ACL(self, url, response_url=''):

        # As Anonymoususer: aspected 302 redirect con login
        response = self.client.get(url)
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, response_url)

        # As Viewer1
        self.assertTrue(self.client.login(username=self.test_viewer1.username, password=self.test_viewer1.username))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 403)
        self.client.logout()

    def test_eleproproject_list(self):
        """ Testing ProjectView """

        url = reverse('eleprofile-project-list')

        self._test_ACL(url, response_url='/en/login/?next=/en/eleprofile/projects/')

        # as Admin01
        self.assertTrue(self.client.login(username=self.test_admin1.username,  password=self.test_admin1.username))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        self.client.logout()

        # FIXME: add possible html tests parsing.

    def test_eleproproject_create(self):
        """ Testing ProjectCreateView """

        url = reverse('eleprofile-project-add')

        self._test_ACL(url, response_url='/en/login/?next=/en/eleprofile/projects/add/')

        # as Admin01
        self.assertTrue(self.client.login(username=self.test_admin1.username, password=self.test_admin1.username))

        data = {
            'project': self.project.instance.pk,
            'note': "<strong>test</strong> note"
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, '/en/eleprofile/projects/')

        eleproprjs = EleProProject.objects.all()
        self.assertEqual(len(eleproprjs), 1)
        self.assertEqual(eleproprjs[0].project_id, self.project.instance.pk)
        self.assertEqual(eleproprjs[0].note, "<strong>test</strong> note")

        self.client.logout()

    def test_eleproproject_update(self):
        """ Testing ProjectUpdateView """

        # Create a eleproproject to update
        epp = EleProProject(project=self.project.instance, note="test note")
        epp.save()

        url = reverse('eleprofile-project-update', args=[epp.pk])

        self._test_ACL(url, response_url=f'/en/login/?next=/en/eleprofile/projects/update/{epp.pk}/')

        # as Admin01
        self.assertTrue(self.client.login(username=self.test_admin1.username, password=self.test_admin1.username))

        data = {
            'project': epp.project_id,
            'note': "test note updated"
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, '/en/eleprofile/projects/')

        eleproprjs = EleProProject.objects.all()
        self.assertEqual(len(eleproprjs), 1)
        self.assertEqual(eleproprjs[0].project_id, self.project.instance.pk)
        self.assertEqual(eleproprjs[0].note, "test note updated")

        self.client.logout()

    def test_eleproproject_delete(self):
        """ Testing ProjectDeleteView """

        # Create a eleproproject to update
        epp = EleProProject(project=self.project.instance, note="test note to delete")
        epp.save()

        url = reverse('eleprofile-project-delete', args=[epp.pk])

        self._test_ACL(url, response_url=f'/en/login/?next=/en/eleprofile/projects/delete/{epp.pk}/')

        # as Admin01
        self.assertTrue(self.client.login(username=self.test_admin1.username, password=self.test_admin1.username))

        response = self.client.post(url)
        self.assertEqual(response.status_code, 200)

        eleproprjs = EleProProject.objects.all()
        self.assertEqual(len(eleproprjs), 0)

        self.client.logout()



