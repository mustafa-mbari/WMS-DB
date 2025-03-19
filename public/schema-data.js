// Schema data for the WMS Interactive Website
const schemaData = {
  categories: [
    {
      id: "warehouse_structure",
      name: "هيكل المستودع",
      name_en: "Warehouse Structure",
      description: "تعريف المستودعات والمناطق والمواقع",
      description_en: "Definition of warehouses, zones, and locations",
      tables: ["warehouses", "zones", "locations"]
    },
    {
      id: "inventory_management",
      name: "إدارة المخزون",
      name_en: "Inventory Management",
      description: "تتبع المخزون والدفعات والحركات",
      description_en: "Tracking inventory, lots, and movements",
      tables: ["inventory", "inventory_transactions", "lot_tracking"]
    },
    {
      id: "operations_management",
      name: "إدارة العمليات",
      name_en: "Operations Management",
      description: "معالجة طلبات الوارد والصادر وأوامر العمل",
      description_en: "Processing inbound, outbound orders and work orders",
      tables: ["inbound_orders", "inbound_order_lines", "outbound_orders", "outbound_order_lines", "work_orders", "work_order_lines"]
    },
    {
      id: "resource_management",
      name: "إدارة الموارد والمعدات",
      name_en: "Resource Management",
      description: "تتبع المعدات وتعييناتها",
      description_en: "Tracking equipment and assignments",
      tables: ["equipment", "equipment_assignments"]
    },
    {
      id: "partner_management",
      name: "إدارة الشركاء التجاريين",
      name_en: "Business Partner Management",
      description: "تسجيل الموردين والعملاء",
      description_en: "Recording suppliers and customers",
      tables: ["suppliers", "customers"]
    },
    {
      id: "uom_barcode",
      name: "وحدات القياس والباركود",
      name_en: "UOM and Barcode",
      description: "إدارة وحدات القياس والباركود",
      description_en: "Managing units of measure and barcodes",
      tables: ["uom", "product_barcodes"]
    },
    {
      id: "quality_control",
      name: "مراقبة الجودة",
      name_en: "Quality Control",
      description: "إجراءات فحص الجودة",
      description_en: "Quality inspection procedures",
      tables: ["quality_control", "qc_parameters"]
    },
    {
      id: "reports_statistics",
      name: "التقارير والإحصائيات",
      name_en: "Reports and Statistics",
      description: "سجل التدقيق ومؤشرات الأداء",
      description_en: "Audit logs and KPI metrics",
      tables: ["audit_log", "kpi_metrics"]
    },
    {
      id: "settings_configuration",
      name: "الإعدادات والتكوين",
      name_en: "Settings and Configuration",
      description: "إعدادات النظام والمستودع",
      description_en: "System and warehouse settings",
      tables: ["system_settings", "warehouse_settings"]
    },
    {
      id: "user_management",
      name: "إدارة المستخدمين",
      name_en: "User Management",
      description: "إدارة المستخدمين والأدوار والصلاحيات",
      description_en: "Managing users, roles and permissions",
      tables: ["users", "roles", "user_roles"]
    },
    {
      id: "product_management",
      name: "إدارة المنتجات",
      name_en: "Product Management",
      description: "إدارة المنتجات وفئاتها وعائلاتها",
      description_en: "Managing products, categories and families",
      tables: ["products", "product_categories", "product_families", "owners"]
    }
  ],
  tables: [
    {
      id: "warehouses",
      name: "المستودعات",
      name_en: "Warehouses",
      category: "warehouse_structure",
      description: "تخزين معلومات المستودعات المختلفة في النظام",
      description_en: "Stores information about different warehouses in the system",
      columns: [
        {name: "warehouse_key", type: "BIGSERIAL", primary_key: true, description: "المفتاح الأساسي للمستودع"},
        {name: "warehouse_id", type: "VARCHAR(64)", unique: true, not_null: true, description: "معرف المستودع الفريد"},
        {name: "name", type: "VARCHAR(256)", not_null: true, description: "اسم المستودع"},
        {name: "description", type: "VARCHAR(2048)", description: "وصف المستودع"},
        {name: "address", type: "VARCHAR(512)", description: "عنوان المستودع"},
        {name: "city", type: "VARCHAR(128)", description: "المدينة"},
        {name: "state", type: "VARCHAR(128)", description: "الولاية/المنطقة"},
        {name: "country", type: "VARCHAR(128)", description: "الدولة"},
        {name: "postal_code", type: "VARCHAR(64)", description: "الرمز البريدي"},
        {name: "status", type: "VARCHAR(32)", default: "ACTIVE", description: "حالة المستودع (نشط، غير نشط، إلخ)"},
        {name: "is_default", type: "BOOLEAN", default: "FALSE", description: "ما إذا كان هذا هو المستودع الافتراضي"},
        {name: "class_type", type: "VARCHAR(32)", description: "نوع الفئة"},
        {name: "transaction_count", type: "NUMERIC(10)", description: "عدد المعاملات"},
        {name: "created_by", type: "VARCHAR(64)", description: "تم إنشاؤه بواسطة"},
        {name: "create_date", type: "TIMESTAMP", default: "CURRENT_TIMESTAMP", description: "تاريخ الإنشاء"},
        {name: "updated_by", type: "VARCHAR(64)", description: "تم تحديثه بواسطة"},
        {name: "update_date", type: "TIMESTAMP", default: "CURRENT_TIMESTAMP", description: "تاريخ التحديث"}
      ],
      relationships: [
        {table: "zones", type: "one-to-many", description: "المستودع يحتوي على عدة مناطق"},
        {table: "locations", type: "one-to-many", description: "المستودع يحتوي على عدة مواقع"},
        {table: "inbound_orders", type: "one-to-many", description: "المستودع يستقبل عدة طلبات واردة"},
        {table: "outbound_orders", type: "one-to-many", description: "المستودع يرسل عدة طلبات صادرة"},
        {table: "work_orders", type: "one-to-many", description: "المستودع يحتوي على عدة أوامر عمل"},
        {table: "equipment", type: "one-to-many", description: "المستودع يحتوي على عدة معدات"},
        {table: "warehouse_settings", type: "one-to-many", description: "المستودع له عدة إعدادات"}
      ],
      usage_tips: [
        {
          title: "إنشاء مستودعات متعددة",
          description: "يمكنك إنشاء مستودعات متعددة لإدارة مواقع مختلفة. تأكد من تعيين is_default = TRUE لمستودع واحد فقط.",
          example: "INSERT INTO warehouses (warehouse_id, name, status) VALUES ('WH001', 'المستودع الرئيسي', 'ACTIVE');"
        },
        {
          title: "تحديث حالة المستودع",
          description: "استخدم حقل status لتحديد ما إذا كان المستودع نشطًا أو في الصيانة أو مغلقًا.",
          example: "UPDATE warehouses SET status = 'MAINTENANCE' WHERE warehouse_id = 'WH001';"
        },
        {
          title: "ربط المستودع بالمناطق",
          description: "كل مستودع يمكن أن يحتوي على عدة مناطق. استخدم warehouse_key كمفتاح خارجي في جدول zones.",
          example: "SELECT z.* FROM zones z JOIN warehouses w ON z.warehouse_key = w.warehouse_key WHERE w.warehouse_id = 'WH001';"
        }
      ]
    },
    {
      id: "zones",
      name: "المناطق",
      name_en: "Zones",
      category: "warehouse_structure",
      description: "تقسيم المستودع إلى مناطق وظيفية مختلفة",
      description_en: "Division of warehouse into different functional zones",
      columns: [
        {name: "zone_key", type: "BIGSERIAL", primary_key: true, description: "المفتاح الأساسي للمنطقة"},
        {name: "zone_id", type: "VARCHAR(64)", unique: true, not_null: true, description: "معرف المنطقة الفريد"},
        {name: "warehouse_key", type: "BIGINT", not_null: true, foreign_key: "warehouses.warehouse_key", description: "المفتاح الخارجي للمستودع"},
        {name: "name", type: "VARCHAR(256)", not_null: true, description: "اسم المنطقة"},
        {name: "description", type: "VARCHAR(2048)", description: "وصف المنطقة"},
        {name: "zone_type", type: "VARCHAR(64)", description: "نوع المنطقة (استلام، تخزين، تجميع، تعبئة، شحن، إلخ)"},
        {name: "status", type: "VARCHAR(32)", default: "ACTIVE", description: "حالة المنطقة"},
        {name: "class_type", type: "VARCHAR(32)", description: "نوع الفئة"},
        {name: "transaction_count", type: "NUMERIC(10)", description: "عدد المعاملات"},
        {name: "created_by", type: "VARCHAR(64)", description: "تم إنشاؤه بواسطة"},
        {name: "create_date", type: "TIMESTAMP", default: "CURRENT_TIMESTAMP", description: "تاريخ الإنشاء"},
        {name: "updated_by", type: "VARCHAR(64)", description: "تم تحديثه بواسطة"},
        {name: "update_date", type: "TIMESTAMP", default: "CURRENT_TIMESTAMP", description: "تاريخ التحديث"}
      ],
      relationships: [
        {table: "warehouses", type: "many-to-one", description: "المنطقة تنتمي إلى مستودع"},
        {table: "locations", type: "one-to-many", description: "المنطقة تحتوي على عدة مواقع"},
        {table: "work_orders", type: "one-to-many", description: "المنطقة يمكن أن تكون مرتبطة بعدة أوامر عمل"}
      ],
      usage_tips: [
        {
          title: "إنشاء مناطق وظيفية",
          description: "قم بإنشاء مناطق مختلفة لكل وظيفة في المستودع (استلام، تخزين، تجميع، إلخ).",
          example: "INSERT INTO zones (zone_id, warehouse_key, name, zone_type) VALUES ('RECV01', 1, 'منطقة الاستلام', 'RECEIVING');"
        },
        {
          title: "تحديد نوع المنطقة",
          description: "استخدم حقل zone_type لتحديد الغرض من المنطقة، مما يساعد في توجيه العمليات.",
          example: "SELECT * FROM zones WHERE zone_type = 'STORAGE' AND warehouse_key = 1;"
        }
      ]
    },
    {
      id: "locations",
      name: "المواقع",
      name_en: "Locations",
      category: "warehouse_structure",
      description: "المواقع الفعلية داخل المستودع حيث يتم تخزين المنتجات",
      description_en: "Actual locations within the warehouse where products are stored",
      columns: [
        {name: "location_key", type: "BIGSERIAL", primary_key: true, description: "المفتاح الأساسي للموقع"},
        {name: "location_id", type: "VARCHAR(64)", unique: true, not_null: true, description: "معرف الموقع الفريد"},
        {name: "warehouse_key", type: "BIGINT", not_null: true, foreign_key: "warehouses.warehouse_key", description: "المفتاح الخارجي للمستودع"},
        {name: "zone_key", type: "BIGINT", foreign_key: "zones.zone_key", description: "المفتاح الخارجي للمنطقة"},
        {name: "aisle", type: "VARCHAR(64)", description: "الممر"},
        {name: "bay", type: "VARCHAR(64)", description: "الخليج"},
        {name: "level", type: "VARCHAR(64)", description: "المستوى"},
        {name: "position", type: "VARCHAR(64)", description: "الموضع"},
        {name: "location_type", type: "VARCHAR(64)", description: "نوع الموقع (رف، صندوق، تخزين ضخم، أرضية، إلخ)"},
        {name: "status", type: "VARCHAR(32)", default: "ACTIVE", description: "حالة الموقع"},
        {name: "is_pickable", type: "BOOLEAN", default: "TRUE", description: "ما إذا كان يمكن التقاط المنتجات من هذا الموقع"},
        {name: "is_storable", type: "BOOLEAN", default: "TRUE", description: "ما إذا كان يمكن تخزين المنتجات في هذا الموقع"},
        {name: "max_weight", type: "NUMERIC(19,4)", description: "الوزن الأقصى المسموح به"},
        {name: "max_volume", type: "NUMERIC(19,4)", description: "الحجم الأقصى المسموح به"},
        {name: "max_items", type: "NUMERIC(10)", description: "الحد الأقصى لعدد العناصر"},
        {name: "barcode", type: "VARCHAR(128)", description: "الباركود الخاص بالموقع"},
        {name: "class_type", type: "VARCHAR(32)", description: "نوع الفئة"},
        {name: "transaction_count", type: "NUMERIC(10)", description: "عدد المعاملات"},
        {name: "created_by", type: "VARCHAR(64)", description: "تم إنشاؤه بواسطة"},
        {name: "create_date", type: "TIMESTAMP", default: "CURRENT_TIMESTAMP", description: "تاريخ الإنشاء"},
        {name: "updated_by", type: "VARCHAR(64)", description: "تم تحديثه بواسطة"},
        {name: "update_date", type: "TIMESTAMP", default: "CURRENT_TIMESTAMP", description: "تاريخ التحديث"}
      ],
      relationships: [
        {table: "warehouses", type: "many-to-one", description: "الموقع ينتمي إلى مستودع"},
        {table: "zones", type: "many-to-one", description: "الموقع ينتمي إلى منطقة"},
        {table: "inventory", type: "one-to-many", description: "الموقع يمكن أن يحتوي على عدة عناصر مخزون"}
      ],
      usage_tips: [
        {
          title: "تنظيم المواقع",
          description: "استخدم حقول aisle و bay و level و position لتنظيم المواقع بطريقة منطقية.",
          example: "INSERT INTO locations (location_id, warehouse_key, zone_key, aisle, bay, level, position) VALUES ('A01-B02-C03-D04', 1, 1, 'A01', 'B02', 'C03', 'D04');"
        },
        {
          title: "تحديد قيود المواقع",
          description: "استخدم حقول max_weight و max_volume و max_items لتحديد قيود السعة للموقع.",
          example: "UPDATE locations SET max_weight = 500, max_volume = 2.5, max_items = 100 WHERE location_id = 'A01-B02-C03-D04';"
        }
      ]
    },
    {
      id: "inventory",
      name: "المخزون",
      name_en: "Inventory",
      category: "inventory_management",
      description: "تتبع كميات المنتجات في كل موقع",
      description_en: "Tracking product quantities in each location",
      columns: [
        {name: "inventory_key", type: "BIGSERIAL", primary_key: true, description: "المفتاح الأساسي للمخزون"},
        {name: "product_key", type: "BIGINT", not_null: true, foreign_key: "products.product_key", description: "المفتاح الخارجي للمنتج"},
        {name: "location_key", type: "BIGINT", not_null: true, foreign_key: "locations.location_key", description: "المفتاح الخارجي للموقع"},
        {name: "lot_number", type: "VARCHAR(64)", description: "رقم الدفعة"},
        {name: "quantity", type: "NUMERIC(19,4)", not_null: true, default: "0", description: "الكمية المتاحة"},
        {name: "allocated_quantity", type: "NUMERIC(19,4)", default: "0", description: "الكمية المخصصة"},
        {name: "uom_id", type: "VARCHAR(64)", description: "معرف وحدة القياس"},
        {name: "status", type: "VARCHAR(32)", default: "AVAILABLE", description: "حالة المخزون (متاح، محجوز، معيب، إلخ)"},
        {name: "expiration_date", type: "TIMESTAMP", description: "تاريخ انتهاء الصلاحية"},
        {name: "class_type", type: "VARCHAR(32)", description: "نوع الفئة"},
        {name: "transaction_count", type: "NUMERIC(10)", description: "عدد المعاملات"},
        {name: "created_by", type: "VARCHAR(64)", description: "تم إنشاؤه بواسطة"},
        {name: "create_date", type: "TIMESTAMP", default: "CURRENT_TIMESTAMP", description: "تاريخ الإنشاء"},
        {name: "updated_by", type: "VARCHAR(64)", description: "تم تحديثه بواسطة"},
        {name: "update_date", type: "TIMESTAMP", default: "CURRENT_TIMESTAMP", description: "تاريخ التحديث"}
      ],
      relationships: [
        {table: "products", type: "many-to-one", description: "المخزون ينتمي إلى منتج"},
        {table: "locations", type: "many-to-one", description: "المخزون موجود في موقع"},
        {table: "inventory_transactions", type: "one-to-many", description: "المخزون له عدة معاملات"}
      ],
      usage_tips: [
        {
          title: "تتبع المخزون حسب الموقع",
          description: "يتم تتبع المخزون على مستوى الموقع. كل سجل يمثل كمية منتج في موقع محدد.",
          example: "SELECT p.name, i.quantity, l.location_id FROM inventory i JOIN products p ON i.product_key = p.product_key JOIN locations l ON i.location_key = l.location_key;"
        },
        {
          title: "تتبع الدفعات وتواريخ انتهاء الصلاحية",
          description: "استخدم حقول lot_number و expiration_date لتتبع الدفعات وتواريخ انتهاء الصلاحية للمنتجات.",
          example: "SELECT * FROM inventory WHERE expiration_date < CURRENT_DATE + INTERVAL '30 days';"
        }
      ]
    },
    {
      id: "inventory_transactions",
      name: "معاملات المخزون",
      name_en: "Inventory Transactions",
      category: "inventory_management",
      description: "سجل حركات المخزون (استلام، صرف، تحويل، تعديل)",
      description_en: "Record of inventory movements (receipt, issue, transfer, adjustment)",
      columns: [
        { name: "transaction_key", type: "BIGSERIAL", primary_key: true, description: "المفتاح الأساسي للمعاملة" },
        { name: "transaction_type", type: "VARCHAR(64)", not_null: true, description: "نوع المعاملة (إضافة، خصم، تعديل، تحويل)" },
        { name: "product_key", type: "BIGINT", not_null: true, foreign_key: "products.product_key", description: "المفتاح الخارجي للمنتج" },
        { name: "location_key", type: "BIGINT", not_null: true, foreign_key: "locations.location_key", description: "المفتاح الخارجي للموقع" },
        { name: "quantity", type: "NUMERIC(19,4)", not_null: true, default: "0", description: "الكمية المعنية بالمعاملة" },
        { name: "transaction_date", type: "TIMESTAMP", default: "CURRENT_TIMESTAMP", description: "تاريخ المعاملة" },
        { name: "created_by", type: "VARCHAR(64)", description: "تم إنشاؤه بواسطة" },
        { name: "updated_by", type: "VARCHAR(64)", description: "تم تحديثه بواسطة" }
      ]
    }
  ]
};
