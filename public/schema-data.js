const schemaData = {
  categories: [
    {
      id: "inventory_management",
      name: "إدارة المخزون",
      name_en: "Inventory Management",
      description: "إدارة المخزون والمواقع والحركات",
      description_en: "Managing inventory, locations and movements",
      tables: ["inventory", "locations", "inventory_movements", "inventory_counts", "inventory_adjustments"]
    },
    {
      id: "operations_management",
      name: "إدارة العمليات",
      name_en: "Operations Management",
      description: "معالجة طلبات الوارد والصادر وأوامر العمل",
      description_en: "Processing inbound, outbound orders and work orders",
      tables: ["inbound_orders", "inbound_order_lines", "outbound_orders", "outbound_order_lines", "work_orders", "work_order_lines", "purchase_orders", "goods_receipt", "supply_orders", "goods_shipment"]
    },
    {
      id: "resource_management",
      name: "إدارة الموارد والمعدات",
      name_en: "Resource Management",
      description: "إدارة الموارد البشرية والمعدات",
      description_en: "Managing human resources and equipment",
      tables: ["employees", "shifts", "equipment", "maintenance_orders"]
    },
    {
      id: "partner_management",
      name: "إدارة الشركاء",
      name_en: "Partner Management",
      description: "إدارة العملاء والموردين والناقلين",
      description_en: "Managing customers, suppliers and carriers",
      tables: ["customers", "suppliers", "carriers", "contracts"]
    },
    {
      id: "product_management",
      name: "إدارة المنتجات",
      name_en: "Product Management",
      description: "إدارة المنتجات وفئاتها وعائلاتها",
      description_en: "Managing products, categories and families",
      tables: ["products", "product_categories", "product_families", "owners", "product_classifications", "measurement_units", "product_specifications", "product_alternatives", "product_images"]
    },
    {
      id: "system_management",
      name: "إدارة النظام",
      name_en: "System Management",
      description: "إدارة مستخدمي النظام والأدوار والصلاحيات",
      description_en: "Managing users, roles and permissions",
      tables: ["users", "roles", "user_roles"]
    }
  ],
  tables: [
    {
      id: "inventory",
      name: "المخزون",
      name_en: "Inventory",
      category: "inventory_management",
      description: "سجلات المخزون الحالي",
      description_en: "Current inventory records",
      columns: [
        { name: "رقم المخزون", name_en: "inventory_id", type: "رقم", primaryKey: true },
        { name: "رقم المنتج", name_en: "product_id", type: "رقم", foreignKey: "products" },
        { name: "رقم الموقع", name_en: "location_id", type: "رقم", foreignKey: "locations" },
        { name: "الكمية", name_en: "quantity", type: "عدد" },
        { name: "وحدة القياس", name_en: "uom", type: "نص" },
        { name: "رقم الدفعة", name_en: "lot_number", type: "نص" },
        { name: "تاريخ الإنتاج", name_en: "production_date", type: "تاريخ" },
        { name: "تاريخ انتهاء الصلاحية", name_en: "expiry_date", type: "تاريخ" },
        { name: "الحالة", name_en: "status", type: "نص" },
        { name: "تاريخ آخر تحديث", name_en: "last_updated", type: "تاريخ ووقت" }
      ]
    },
    {
      id: "locations",
      name: "المواقع",
      name_en: "Locations",
      category: "inventory_management",
      description: "مواقع التخزين في المستودع",
      description_en: "Storage locations in the warehouse",
      columns: [
        { name: "رقم الموقع", name_en: "location_id", type: "رقم", primaryKey: true },
        { name: "اسم الموقع", name_en: "location_name", type: "نص" },
        { name: "نوع الموقع", name_en: "location_type", type: "نص" },
        { name: "المنطقة", name_en: "zone", type: "نص" },
        { name: "الممر", name_en: "aisle", type: "نص" },
        { name: "الرف", name_en: "rack", type: "نص" },
        { name: "المستوى", name_en: "level", type: "نص" },
        { name: "الخلية", name_en: "bin", type: "نص" },
        { name: "السعة القصوى", name_en: "max_capacity", type: "عدد" },
        { name: "وحدة السعة", name_en: "capacity_uom", type: "نص" },
        { name: "الحالة", name_en: "status", type: "نص" }
      ]
    },
    {
      id: "inbound_orders",
      name: "طلبات الوارد",
      name_en: "Inbound Orders",
      category: "operations_management",
      description: "طلبات استلام البضائع الواردة",
      description_en: "Incoming goods receipt orders",
      columns: [
        { name: "رقم الطلب", name_en: "order_id", type: "رقم", primaryKey: true },
        { name: "نوع الطلب", name_en: "order_type", type: "نص" },
        { name: "رقم المورد", name_en: "supplier_id", type: "رقم", foreignKey: "suppliers" },
        { name: "تاريخ الطلب", name_en: "order_date", type: "تاريخ" },
        { name: "تاريخ الاستلام المتوقع", name_en: "expected_receipt_date", type: "تاريخ" },
        { name: "حالة الطلب", name_en: "status", type: "نص" },
        { name: "ملاحظات", name_en: "notes", type: "نص" },
        { name: "تاريخ الإنشاء", name_en: "created_at", type: "تاريخ ووقت" },
        { name: "المستخدم المنشئ", name_en: "created_by", type: "رقم", foreignKey: "users" }
      ]
    },
    {
      id: "inbound_order_lines",
      name: "بنود طلبات الوارد",
      name_en: "Inbound Order Lines",
      category: "operations_management",
      description: "تفاصيل بنود طلبات الوارد",
      description_en: "Inbound order line details",
      columns: [
        { name: "رقم البند", name_en: "line_id", type: "رقم", primaryKey: true },
        { name: "رقم الطلب", name_en: "order_id", type: "رقم", foreignKey: "inbound_orders" },
        { name: "رقم المنتج", name_en: "product_id", type: "رقم", foreignKey: "products" },
        { name: "الكمية المطلوبة", name_en: "expected_quantity", type: "عدد" },
        { name: "الكمية المستلمة", name_en: "received_quantity", type: "عدد" },
        { name: "وحدة القياس", name_en: "uom", type: "نص" },
        { name: "رقم الدفعة", name_en: "lot_number", type: "نص" },
        { name: "تاريخ الإنتاج", name_en: "production_date", type: "تاريخ" },
        { name: "تاريخ انتهاء الصلاحية", name_en: "expiry_date", type: "تاريخ" },
        { name: "حالة البند", name_en: "status", type: "نص" }
      ]
    },
    {
      id: "outbound_orders",
      name: "طلبات الصادر",
      name_en: "Outbound Orders",
      category: "operations_management",
      description: "طلبات شحن البضائع الصادرة",
      description_en: "Outgoing goods shipment orders",
      columns: [
        { name: "رقم الطلب", name_en: "order_id", type: "رقم", primaryKey: true },
        { name: "نوع الطلب", name_en: "order_type", type: "نص" },
        { name: "رقم العميل", name_en: "customer_id", type: "رقم", foreignKey: "customers" },
        { name: "تاريخ الطلب", name_en: "order_date", type: "تاريخ" },
        { name: "تاريخ الشحن المطلوب", name_en: "requested_ship_date", type: "تاريخ" },
        { name: "أولوية الطلب", name_en: "priority", type: "نص" },
        { name: "حالة الطلب", name_en: "status", type: "نص" },
        { name: "ملاحظات", name_en: "notes", type: "نص" },
        { name: "تاريخ الإنشاء", name_en: "created_at", type: "تاريخ ووقت" },
        { name: "المستخدم المنشئ", name_en: "created_by", type: "رقم", foreignKey: "users" }
      ]
    },
    {
      id: "outbound_order_lines",
      name: "بنود طلبات الصادر",
      name_en: "Outbound Order Lines",
      category: "operations_management",
      description: "تفاصيل بنود طلبات الصادر",
      description_en: "Outbound order line details",
      columns: [
        { name: "رقم البند", name_en: "line_id", type: "رقم", primaryKey: true },
        { name: "رقم الطلب", name_en: "order_id", type: "رقم", foreignKey: "outbound_orders" },
        { name: "رقم المنتج", name_en: "product_id", type: "رقم", foreignKey: "products" },
        { name: "الكمية المطلوبة", name_en: "requested_quantity", type: "عدد" },
        { name: "الكمية المشحونة", name_en: "shipped_quantity", type: "عدد" },
        { name: "وحدة القياس", name_en: "uom", type: "نص" },
        { name: "رقم الدفعة", name_en: "lot_number", type: "نص" },
        { name: "حالة البند", name_en: "status", type: "نص" }
      ]
    },
    {
      id: "work_orders",
      name: "أوامر العمل",
      name_en: "Work Orders",
      category: "operations_management",
      description: "أوامر العمل للعمليات الداخلية",
      description_en: "Work orders for internal operations",
      columns: [
        { name: "رقم أمر العمل", name_en: "work_order_id", type: "رقم", primaryKey: true },
        { name: "نوع أمر العمل", name_en: "work_order_type", type: "نص" },
        { name: "تاريخ الإنشاء", name_en: "creation_date", type: "تاريخ" },
        { name: "تاريخ البدء المخطط", name_en: "planned_start_date", type: "تاريخ" },
        { name: "تاريخ الانتهاء المخطط", name_en: "planned_end_date", type: "تاريخ" },
        { name: "تاريخ البدء الفعلي", name_en: "actual_start_date", type: "تاريخ" },
        { name: "تاريخ الانتهاء الفعلي", name_en: "actual_end_date", type: "تاريخ" },
        { name: "حالة أمر العمل", name_en: "status", type: "نص" },
        { name: "الأولوية", name_en: "priority", type: "نص" },
        { name: "ملاحظات", name_en: "notes", type: "نص" },
        { name: "المستخدم المنشئ", name_en: "created_by", type: "رقم", foreignKey: "users" }
      ]
    },
    {
      id: "work_order_lines",
      name: "بنود أوامر العمل",
      name_en: "Work Order Lines",
      category: "operations_management",
      description: "تفاصيل بنود أوامر العمل",
      description_en: "Work order line details",
      columns: [
        { name: "رقم البند", name_en: "line_id", type: "رقم", primaryKey: true },
        { name: "رقم أمر العمل", name_en: "work_order_id", type: "رقم", foreignKey: "work_orders" },
        { name: "رقم المنتج", name_en: "product_id", type: "رقم", foreignKey: "products" },
        { name: "الكمية المخططة", name_en: "planned_quantity", type: "عدد" },
        { name: "الكمية المنجزة", name_en: "completed_quantity", type: "عدد" },
        { name: "وحدة القياس", name_en: "uom", type: "نص" },
        { name: "حالة البند", name_en: "status", type: "نص" },
        { name: "ملاحظات", name_en: "notes", type: "نص" }
      ]
    },
    {
      id: "purchase_orders",
      name: "طلبات الشراء",
      name_en: "Purchase Orders",
      category: "operations_management",
      description: "إدارة طلبات الشراء من الموردين",
      description_en: "Managing purchase orders from suppliers",
      columns: [
        { name: "رقم الطلب", name_en: "order_id", type: "رقم", primaryKey: true },
        { name: "تاريخ الطلب", name_en: "order_date", type: "تاريخ" },
        { name: "رقم المورد", name_en: "supplier_id", type: "رقم", foreignKey: "suppliers" },
        { name: "حالة الطلب", name_en: "status", type: "نص" },
        { name: "إجمالي القيمة", name_en: "total_value", type: "عدد" },
        { name: "تاريخ التسليم المتوقع", name_en: "expected_delivery_date", type: "تاريخ" },
        { name: "ملاحظات", name_en: "notes", type: "نص" },
        { name: "تاريخ الإنشاء", name_en: "created_at", type: "تاريخ ووقت" },
        { name: "المستخدم المنشئ", name_en: "created_by", type: "رقم", foreignKey: "users" }
      ]
    },
    {
      id: "goods_receipt",
      name: "استلام البضائع",
      name_en: "Goods Receipt",
      category: "operations_management",
      description: "تسجيل عمليات استلام البضائع في المستودع",
      description_en: "Recording goods receipt operations in the warehouse",
      columns: [
        { name: "رقم الاستلام", name_en: "receipt_id", type: "رقم", primaryKey: true },
        { name: "تاريخ الاستلام", name_en: "receipt_date", type: "تاريخ" },
        { name: "رقم طلب الشراء", name_en: "purchase_order_id", type: "رقم", foreignKey: "purchase_orders" },
        { name: "المستلم", name_en: "receiver", type: "نص" },
        { name: "حالة الاستلام", name_en: "status", type: "نص" },
        { name: "ملاحظات", name_en: "notes", type: "نص" },
        { name: "تاريخ الإنشاء", name_en: "created_at", type: "تاريخ ووقت" },
        { name: "المستخدم المنشئ", name_en: "created_by", type: "رقم", foreignKey: "users" }
      ]
    },
    {
      id: "supply_orders",
      name: "طلبات التوريد",
      name_en: "Supply Orders",
      category: "operations_management",
      description: "إدارة طلبات توريد المنتجات للعملاء",
      description_en: "Managing product supply orders for customers",
      columns: [
        { name: "رقم طلب التوريد", name_en: "supply_order_id", type: "رقم", primaryKey: true },
        { name: "تاريخ الطلب", name_en: "order_date", type: "تاريخ" },
        { name: "رقم العميل", name_en: "customer_id", type: "رقم", foreignKey: "customers" },
        { name: "حالة الطلب", name_en: "status", type: "نص" },
        { name: "إجمالي القيمة", name_en: "total_value", type: "عدد" },
        { name: "تاريخ التسليم المطلوب", name_en: "requested_delivery_date", type: "تاريخ" },
        { name: "أولوية الطلب", name_en: "priority", type: "نص" },
        { name: "ملاحظات", name_en: "notes", type: "نص" },
        { name: "تاريخ الإنشاء", name_en: "created_at", type: "تاريخ ووقت" },
        { name: "المستخدم المنشئ", name_en: "created_by", type: "رقم", foreignKey: "users" }
      ]
    },
    {
      id: "goods_shipment",
      name: "شحن البضائع",
      name_en: "Goods Shipment",
      category: "operations_management",
      description: "تسجيل عمليات شحن البضائع من المستودع",
      description_en: "Recording goods shipment operations from the warehouse",
      columns: [
        { name: "رقم الشحنة", name_en: "shipment_id", type: "رقم", primaryKey: true },
        { name: "تاريخ الشحن", name_en: "shipment_date", type: "تاريخ" },
        { name: "رقم طلب التوريد", name_en: "supply_order_id", type: "رقم", foreignKey: "supply_orders" },
        { name: "شركة الشحن", name_en: "shipping_company", type: "نص" },
        { name: "رقم تتبع الشحنة", name_en: "tracking_number", type: "نص" },
        { name: "حالة الشحن", name_en: "status", type: "نص" },
        { name: "تكلفة الشحن", name_en: "shipping_cost", type: "عدد" },
        { name: "ملاحظات", name_en: "notes", type: "نص" },
        { name: "تاريخ الإنشاء", name_en: "created_at", type: "تاريخ ووقت" },
        { name: "المستخدم المنشئ", name_en: "created_by", type: "رقم", foreignKey: "users" }
      ]
    },
    {
      id: "products",
      name: "المنتجات",
      name_en: "Products",
      category: "product_management",
      description: "بيانات المنتجات الأساسية",
      description_en: "Basic product data",
      columns: [
        { name: "رقم المنتج", name_en: "product_id", type: "رقم", primaryKey: true },
        { name: "اسم المنتج", name_en: "product_name", type: "نص" },
        { name: "الوصف", name_en: "description", type: "نص" },
        { name: "الباركود", name_en: "barcode", type: "نص" },
        { name: "SKU", name_en: "sku", type: "نص" },
        { name: "رقم الفئة", name_en: "category_id", type: "رقم", foreignKey: "product_categories" },
        { name: "رقم العائلة", name_en: "family_id", type: "رقم", foreignKey: "product_families" },
        { name: "رقم المالك", name_en: "owner_id", type: "رقم", foreignKey: "owners" },
        { name: "وحدة القياس", name_en: "uom", type: "نص" },
        { name: "الوزن", name_en: "weight", type: "عدد" },
        { name: "وحدة الوزن", name_en: "weight_uom", type: "نص" },
        { name: "الحجم", name_en: "volume", type: "عدد" },
        { name: "وحدة الحجم", name_en: "volume_uom", type: "نص" },
        { name: "الحالة", name_en: "status", type: "نص" }
      ]
    },
    {
      id: "product_categories",
      name: "فئات المنتجات",
      name_en: "Product Categories",
      category: "product_management",
      description: "فئات تصنيف المنتجات",
      description_en: "Product classification categories",
      columns: [
        { name: "رقم الفئة", name_en: "category_id", type: "رقم", primaryKey: true },
        { name: "اسم الفئة", name_en: "category_name", type: "نص" },
        { name: "الوصف", name_en: "description", type: "نص" },
        { name: "الفئة الأب", name_en: "parent_category_id", type: "رقم", foreignKey: "product_categories" }
      ]
    },
    {
      id: "product_families",
      name: "عائلات المنتجات",
      name_en: "Product Families",
      category: "product_management",
      description: "عائلات المنتجات المتشابهة",
      description_en: "Families of similar products",
      columns: [
        { name: "رقم العائلة", name_en: "family_id", type: "رقم", primaryKey: true },
        { name: "اسم العائلة", name_en: "family_name", type: "نص" },
        { name: "الوصف", name_en: "description", type: "نص" }
      ]
    },
    {
      id: "owners",
      name: "مالكي المنتجات",
      name_en: "Product Owners",
      category: "product_management",
      description: "الشركات المالكة للمنتجات",
      description_en: "Companies owning the products",
      columns: [
        { name: "رقم المالك", name_en: "owner_id", type: "رقم", primaryKey: true },
        { name: "اسم المالك", name_en: "owner_name", type: "نص" },
        { name: "جهة الاتصال", name_en: "contact_person", type: "نص" },
        { name: "البريد الإلكتروني", name_en: "email", type: "نص" },
        { name: "رقم الهاتف", name_en: "phone", type: "نص" },
        { name: "العنوان", name_en: "address", type: "نص" }
      ]
    },
    {
      id: "product_classifications",
      name: "تصنيفات المنتجات",
      name_en: "Product Classifications",
      category: "product_management",
      description: "إدارة تصنيفات وفئات المنتجات",
      description_en: "Managing product classifications and categories",
      columns: [
        { name: "رقم التصنيف", name_en: "classification_id", type: "رقم", primaryKey: true },
        { name: "اسم التصنيف", name_en: "classification_name", type: "نص" },
        { name: "التصنيف الأب", name_en: "parent_classification_id", type: "رقم", foreignKey: "product_classifications" },
        { name: "الوصف", name_en: "description", type: "نص" },
        { name: "تاريخ الإنشاء", name_en: "created_at", type: "تاريخ" },
        { name: "الحالة", name_en: "status", type: "نص" }
      ]
    },
    {
      id: "measurement_units",
      name: "وحدات القياس",
      name_en: "Measurement Units",
      category: "product_management",
      description: "إدارة وحدات قياس المنتجات",
      description_en: "Managing product measurement units",
      columns: [
        { name: "رقم الوحدة", name_en: "unit_id", type: "رقم", primaryKey: true },
        { name: "اسم الوحدة", name_en: "unit_name", type: "نص" },
        { name: "الرمز", name_en: "symbol", type: "نص" },
        { name: "الوصف", name_en: "description", type: "نص" },
        { name: "معامل التحويل", name_en: "conversion_factor", type: "عدد" },
        { name: "الوحدة الأساسية", name_en: "base_unit", type: "نص" }
      ]
    },
    {
      id: "product_specifications",
      name: "مواصفات المنتجات",
      name_en: "Product Specifications",
      category: "product_management",
      description: "تفاصيل مواصفات وخصائص المنتجات",
      description_en: "Details of product specifications and characteristics",
      columns: [
        { name: "رقم المواصفة", name_en: "specification_id", type: "رقم", primaryKey: true },
        { name: "رقم المنتج", name_en: "product_id", type: "رقم", foreignKey: "products" },
        { name: "اسم الخاصية", name_en: "attribute_name", type: "نص" },
        { name: "قيمة الخاصية", name_en: "attribute_value", type: "نص" },
        { name: "وحدة القياس", name_en: "unit_of_measure", type: "نص" },
        { name: "ملاحظات", name_en: "notes", type: "نص" }
      ]
    },
    {
      id: "product_alternatives",
      name: "بدائل المنتجات",
      name_en: "Product Alternatives",
      category: "product_management",
      description: "إدارة البدائل المتاحة للمنتجات",
      description_en: "Managing available alternatives for products",
      columns: [
        { name: "رقم البديل", name_en: "alternative_id", type: "رقم", primaryKey: true },
        { name: "رقم المنتج الأساسي", name_en: "primary_product_id", type: "رقم", foreignKey: "products" },
        { name: "رقم المنتج البديل", name_en: "alternative_product_id", type: "رقم", foreignKey: "products" },
        { name: "نسبة التوافق", name_en: "compatibility_percentage", type: "عدد" },
        { name: "ملاحظات", name_en: "notes", type: "نص" }
      ]
    },
    {
      id: "product_images",
      name: "صور المنتجات",
      name_en: "Product Images",
      category: "product_management",
      description: "إدارة الصور والمرفقات الخاصة بالمنتجات",
      description_en: "Managing images and attachments for products",
      columns: [
        { name: "رقم الصورة", name_en: "image_id", type: "رقم", primaryKey: true },
        { name: "رقم المنتج", name_en: "product_id", type: "رقم", foreignKey: "products" },
        { name: "اسم الملف", name_en: "file_name", type: "نص" },
        { name: "نوع الملف", name_en: "file_type", type: "نص" },
        { name: "حجم الملف", name_en: "file_size", type: "عدد" },
        { name: "تاريخ الرفع", name_en: "upload_date", type: "تاريخ" },
        { name: "الوصف", name_en: "description", type: "نص" }
      ]
    }
  ]
};
