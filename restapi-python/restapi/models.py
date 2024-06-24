from django.db import models

class Empleado(models.Model):
    id_empleado = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    cedula_identidad = models.CharField(max_length=50)
    telefono = models.CharField(max_length=50)
    direccion = models.CharField(max_length=50)
    
    def __str__(self):
        return f"{self.nombre} {self.apellido}"
    
    class Meta:
        managed = False
        db_table = 'empleado'

class Cliente(models.Model):
    id_cliente = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    cedula_identidad = models.CharField(max_length=50)
    telefono = models.CharField(max_length=50)
    direccion = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)  # Usa EmailField para correos electrónicos
    
    def __str__(self):
        return f"{self.nombre} {self.apellido}"
    
    class Meta: 
        managed = False
        db_table = 'cliente'

class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    estado = models.CharField(max_length=50)
    tipo = models.CharField(max_length=50)
    
    def __str__(self):
        return self.nombre
    
    class Meta: 
        managed = False
        db_table = 'categoria'

class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    precio = models.DecimalField(max_digits=10, decimal_places=2)  # Usa DecimalField para precios
    stock = models.PositiveIntegerField()  # Usa PositiveIntegerField para cantidades no negativas
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, db_column='id_categoria')
    
    def __str__(self):
        return self.nombre
      
    class Meta: 
      managed = False
      db_table = 'producto'

class ProductoFactura(models.Model):
    id_producto_factura = models.AutoField(primary_key=True)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, db_column="id_producto")
    cantidad = models.PositiveIntegerField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    tamano = models.CharField(max_length=50)
    peso = models.FloatField()
    
    def __str__(self):
        return f"{self.producto.nombre} - {self.cantidad} pcs"
      
    class Meta: 
        managed = False
        db_table = 'productofactura'

class Factura(models.Model):
    id_factura = models.AutoField(primary_key=True)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, db_column='id_cliente')
    empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE, db_column='id_empleado')
    fecha = models.DateField()
    total = models.DecimalField(max_digits=10, decimal_places=2)
    descuento = models.DecimalField(max_digits=5, decimal_places=2)
    
    def __str__(self):
        return f"Factura {self.id_factura} - {self.cliente.nombre}"
    
    class Meta:
        managed = False
        db_table = 'factura'

 