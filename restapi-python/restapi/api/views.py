# restapi/views.py
from rest_framework import viewsets
from ..models import Empleado, Cliente, Categoria, Producto, ProductoFactura, Factura
from .serializers import (
    EmpleadoSerializer, ClienteSerializer, CategoriaSerializer, 
    ProductoSerializer, ProductoFacturaSerializer, FacturaSerializer
)

class EmpleadoViewSet(viewsets.ModelViewSet):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class ProductoFacturaViewSet(viewsets.ModelViewSet):
    queryset = ProductoFactura.objects.all()
    serializer_class = ProductoFacturaSerializer

class FacturaViewSet(viewsets.ModelViewSet):
    queryset = Factura.objects.all()
    serializer_class = FacturaSerializer
