# coding=utf-8
""""
    Testing eleprofile module models.
.. note:: This program is free software; you can redistribute it and/or modify
    it under the terms of the Mozilla Public License 2.0.

"""

__author__ = 'lorenzetti@gis3w.it'
__date__ = '2020-07-09'
__copyright__ = 'Copyright 2015 - 2020, Gis3w'


from qdjango.models import Project
from eleprofile.models import EleProProject
from .base import EleprofileTestBase




class EleprofileModelsTests(EleprofileTestBase):
    """Testing class for eleprofile module models"""

    def test_eleproproject(self):
        """Test homonymous model class"""

        project = Project.objects.all()[0]
        elepro_prj = EleProProject(project=project, note='test note')
        elepro_prj.save()

        # reload
        del(elepro_prj)

        elepro_prj = EleProProject.objects.all()[0]
        self.assertEqual(elepro_prj.project, project)
        self.assertEqual(elepro_prj.note, 'test note')


