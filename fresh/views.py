import json
from django.http import HttpResponse


def fresh(request):
    # this will get updated in middleware and set to True if stale
    return HttpResponse(
        json.dumps({'fresh': False}),
        content_type='application/json',
    )
