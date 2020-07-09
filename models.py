# coding=utf-8
""""

.. note:: This program is free software; you can redistribute it and/or modify
    it under the terms of the Mozilla Public License 2.0.

"""

__author__ = 'lorenzetti@gis3w.it'
__date__ = '2020-07-09'
__copyright__ = 'Copyright 2015 - 2020, Gis3w'

from django.db import models
from qdjango.models import Project, Layer


class EleProProject(models.Model):
    """ Main elevation profile projects """

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="%(app_label)s_projects")
    note = models.TextField('Note', null=True, blank=True)

    class Meta:
        verbose_name = 'Elevation Profile Project'


class EleProDTM(models.Model):
    """ For every elevation profile projects dtm layers to use """
    elepro_project = models.ForeignKey(EleProProject, on_delete=models.CASCADE, related_name="dtm_layers")
    dtm_layer = models.ForeignKey(Layer, on_delete=models.CASCADE)
    note = models.TextField('Note', null=True, blank=True)

    class Meta:
        verbose_name = 'Elevation Profile DTM Layer'


class EleProLayer(models.Model):
    """ For very dtm layer set LineString/MultiLineString layers """

    elepro_dtm_layer = models.ForeignKey(EleProDTM, on_delete=models.CASCADE, related_name="line_layers")
    layer = models.ForeignKey(Layer, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Elevation Profile Line Layer'