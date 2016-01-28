import json
from django.http import HttpResponse


def fresh(request):
    return HttpResponse(
        json.dumps({'fresh': False}), content_type='application/json')
