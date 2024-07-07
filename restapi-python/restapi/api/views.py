# restapi/views.py
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
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
    
    @action(detail=False, methods=['get'], url_path='bycategory/(?P<id_categoria>[^/.]+)') # get products by category
    def get_products_by_category(self, request, id_categoria=None):
        try:
            products = Producto.objects.filter(categoria=id_categoria)
            serializer = self.get_serializer(products, many=True)
            # print("Products by category: ", serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Producto.DoesNotExist:
            return Response({"error": "The category does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    def create(self, request, *args, **kwargs):
        # Intercept and log the request data
        data = request.data
        print("Request data:", data)
          # Check if 'categoria' is in the request data
        if 'categoria' not in data:
            return Response({"error": "The 'categoria' field is required."}, status=status.HTTP_400_BAD_REQUEST)
        # Modify the request data if needed
        data['nombre'] = data.get('nombre', '')
        if data['nombre'] == '':
            return Response({
                "nombre": "This field is required.",
                "precio": data['precio'],
                "stock": data['stock'],    
                "categoria": data['categoria'],   
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if data['precio'] == '':
            return Response({
                "id_producto": "",
                "precio": "This field is required.",
                "nombre": data['nombre'],
                "stock": data['stock'],    
                "categoria": data['categoria'],                
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if data['stock'] == '':
            return Response({
                "id_producto": "",
                "stock": "This field is required.",
                "nombre": data['nombre'],
                "precio": data['precio'],
                "categoria": data['categoria'],   
            }, status=status.HTTP_400_BAD_REQUEST)
        # Pass the modified data to the serializer
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class ProductoFacturaViewSet(viewsets.ModelViewSet):
    queryset = ProductoFactura.objects.all()
    serializer_class = ProductoFacturaSerializer
    
    @action(detail=False, methods=['get'], url_path='byproduct/(?P<id_producto>[^/.]+)') # get productsFactura by product 
    def get_productsFactura_by_product(self, request, id_producto=None):
        try:
            productsFactura = ProductoFactura.objects.filter(producto=id_producto)
            serializer = self.get_serializer(productsFactura, many=True)
            # print("ProductsFactura by product: ", serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ProductoFactura.DoesNotExist:
            return Response({"error": "The product does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, methods=['get'], url_path='byfactura/(?P<id_factura>[^/.]+)') # get productsFactura by factura
    def get_productsFactura_by_factura(self, request, id_factura=None):
        try:
            productsFactura = ProductoFactura.objects.filter(factura=id_factura)
            serializer = self.get_serializer(productsFactura, many=True)
            # print("ProductsFactura by factura: ", serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ProductoFactura.DoesNotExist:
            return Response({"error": "The factura does not exist."}, status=status.HTTP_404_NOT_FOUND)

class FacturaViewSet(viewsets.ModelViewSet):
    queryset = Factura.objects.all()
    serializer_class = FacturaSerializer
    
    @action (detail=False, methods=['get'], url_path='byproductofactura/(?P<id_producto_factura>[^/.]+)') # get facturas by productoFactura
    def get_facturas_by_productoFactura(self, request, id_producto_factura=None):
        try:
            facturas = Factura.objects.filter(ProductoFactura=id_producto_factura)
            serializer = self.get_serializer(facturas, many=True)
            # print("Facturas by productoFactura: ", serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Factura.DoesNotExist:
            return Response({"error": "The product does not exist."}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'], url_path='bycliente/(?P<id_cliente>[^/.]+)') # get facturas by cliente
    def get_facturas_by_cliente(self, request, id_cliente=None):
        try:
            facturas = Factura.objects.filter(cliente=id_cliente)
            serializer = self.get_serializer(facturas, many=True)
            # print("Facturas by cliente: ", serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Factura.DoesNotExist:
            return Response({"error": "The cliente does not exist."}, status=status.HTTP_404_NOT_FOUND)
        
    @action(detail=False, methods=['get'], url_path='byempleado/(?P<id_empleado>[^/.]+)') # get facturas by empleado
    def get_facturas_by_empleado(self, request, id_empleado=None):
        try:
            facturas = Factura.objects.filter(empleado=id_empleado)
            serializer = self.get_serializer(facturas, many=True)
            # print("Facturas by empleado: ", serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Factura.DoesNotExist:
            return Response({"error": "The empleado does not exist."}, status=status.HTTP_404_NOT_FOUND)