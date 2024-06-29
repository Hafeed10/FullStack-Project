from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from StudentApp.serializers import StudentSerializer
from StudentApp.models import Student
from rest_framework import status

@csrf_exempt
def studentApi(request, id=0):
    if request.method == 'GET':
        students = Student.objects.all()
        student_serializer = StudentSerializer(students, many=True)
        return JsonResponse(student_serializer.data, safe=False)

    elif request.method == 'POST':
        try:
            student_data = JSONParser().parse(request)
        except Exception as e:
            return JsonResponse({"error": f"Invalid JSON - {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

        student_serializer = StudentSerializer(data=student_data)
        if student_serializer.is_valid():
            student_serializer.save()
            return JsonResponse("Added Successfully", safe=False, status=status.HTTP_201_CREATED)
        return JsonResponse(student_serializer.errors, safe=False, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        try:
            student_data = JSONParser().parse(request)
        except Exception as e:
            return JsonResponse({"error": f"Invalid JSON - {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            student = Student.objects.get(id=id)
        except Student.DoesNotExist:
            return JsonResponse("Student not found", safe=False, status=status.HTTP_404_NOT_FOUND)

        student_serializer = StudentSerializer(student, data=student_data)
        if student_serializer.is_valid():
            student_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse(student_serializer.errors, safe=False, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        try:
            student = Student.objects.get(id=id)
        except Student.DoesNotExist:
            return JsonResponse("Student not found", safe=False, status=status.HTTP_404_NOT_FOUND)

        student.delete()
        return JsonResponse("Deleted Successfully", safe=False)

    else:
        return JsonResponse("Method not allowed", safe=False, status=status.HTTP_405_METHOD_NOT_ALLOWED)
