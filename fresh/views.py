import json
from django.http import HttpResponse


def fresh(request):
    try:
        return HttpResponse(
            json.dumps({'fresh': False}), content_type='application/json')
    except TypeError:
        # < Django 1.4 uses mimetype instead of content_type
        return HttpResponse(
            json.dumps({'fresh': False}), mimetype='application/json')
