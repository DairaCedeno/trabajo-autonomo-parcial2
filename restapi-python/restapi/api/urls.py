# mi_aplicacion/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    EmpleadoViewSet, ClienteViewSet, CategoriaViewSet, 
    ProductoViewSet, ProductoFacturaViewSet, FacturaViewSet
)

router = DefaultRouter()
""" router.register(r'empleados', EmpleadoViewSet, basename='Empleado')
router.register(r'clientes', ClienteViewSet, basename='Cliente')
router.register(r'categorias', CategoriaViewSet, basename='Categoria') """

router.register(r'productos', ProductoViewSet)
router.register(r'productosfactura', ProductoFacturaViewSet)
router.register(r'facturas', FacturaViewSet)

urlpatterns = router.urls
