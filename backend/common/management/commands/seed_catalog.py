from datetime import date, timedelta
from decimal import Decimal
from django.core.management.base import BaseCommand
from django.utils import timezone

from mandi.models import APMC, AuctionLot, Commodity, DailyTicker
from rentals.models import Equipment
from store.models import Category, Product
from users.models import CustomUser, FarmerProfile, MerchantProfile


class Command(BaseCommand):
    help = "Seed database with master catalog for users, equipment, store products, and mandi commodities"

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("[*] Seeding AgriMart Master Catalog..."))

        # 1. Users
        admin_user, _ = CustomUser.objects.get_or_create(
            phone="9999999999",
            defaults={
                "email": "admin@agrimart.in",
                "full_name": "AgriMart Systems Administrator",
                "role": CustomUser.Role.ADMIN,
                "village_pincode": "110001",
                "is_verified": True,
                "is_staff": True,
                "is_superuser": True,
            },
        )
        admin_user.set_password("AdminPassword@2026")
        admin_user.save()

        farmer_user, _ = CustomUser.objects.get_or_create(
            phone="9876543210",
            defaults={
                "email": "devinder.singh@kisan.in",
                "full_name": "Devinder Singh",
                "role": CustomUser.Role.FARMER,
                "village_pincode": "141001",
                "is_verified": True,
            },
        )
        farmer_user.set_password("FarmerPassword@2026")
        farmer_user.save()

        FarmerProfile.objects.get_or_create(
            user=farmer_user,
            defaults={
                "farm_acreage": Decimal("18.5"),
                "soil_type": "Alluvial Silty Loam",
                "irrigation_type": "Canal + Solar Borewell",
                "kisan_card_number_last4": "4091",
            },
        )

        merchant_user, _ = CustomUser.objects.get_or_create(
            phone="9123456780",
            defaults={
                "email": "trader@rajkotmandi.com",
                "full_name": "Rajkot Agri-Exports Pvt Ltd",
                "role": CustomUser.Role.MERCHANT,
                "village_pincode": "360001",
                "is_verified": True,
            },
        )
        merchant_user.set_password("MerchantPassword@2026")
        merchant_user.save()

        MerchantProfile.objects.get_or_create(
            user=merchant_user,
            defaults={
                "company_name": "Rajkot Agri-Exports Pvt Ltd",
                "apmc_license_no": "GJ-RJK-2024-8841",
                "credit_limit": Decimal("1500000.00"),
                "risk_status": MerchantProfile.RiskStatus.NORMAL,
                "gst_number_last4": "1Z5A",
            },
        )
        self.stdout.write(self.style.SUCCESS("  [+] Seeded 3 Core Users (Admin, Farmer, Merchant)"))

        # 2. Categories
        categories_data = [
            ("seeds", "Heirloom & Hybrid Seeds", "sparkles", "Certified 98% germination rate heirloom, non-GMO and hybrid cultivars."),
            ("machines", "Field Machinery & Sprayers", "cog", "Electric dual-pressure knapsack sprayers, cordless cultivators & equipment."),
            ("care", "Botanical Crop Care", "shield", "Bio-stimulants, systemic fungal remedies, and organic soil tonics."),
            ("tools", "Crafted Hand Tools", "wrench", "Hand-forged carbon-steel harvesting sickles, shears, and ergonomic aerators."),
            ("irrigation", "Micro-Irrigation Systems", "cloud", "Gravity drip manifolds, brass misting arrays, and solar pump valves."),
        ]
        cat_map = {}
        for slug, name, icon, desc in categories_data:
            cat, _ = Category.objects.get_or_create(slug=slug, defaults={"name": name, "icon": icon, "description": desc})
            cat_map[slug] = cat
        self.stdout.write(self.style.SUCCESS("  [+] Seeded 5 Store Categories"))

        # 3. Products
        products_data = [
            {
                "sku": "AGRI-SEED-MAIZE-3302",
                "category": cat_map["seeds"],
                "name": "Pioneer 3302 Heritage Maize Cultivar (5kg)",
                "price": Decimal("540.00"),
                "stock_quantity": 40,
                "lab_germination_pct": Decimal("94.50"),
                "purity_rating": Decimal("99.40"),
                "specifications_json": {
                    "Germination Guarantee": ">= 94%",
                    "Purity Index": "99.4%",
                    "Maturity Period": "105 - 110 Days",
                    "Optimal Soil": "Well-drained Silty Loam",
                    "Origin": "Certified Breeder Seed Farm",
                },
            },
            {
                "sku": "AGRI-MACH-SPRAY-S1",
                "category": cat_map["machines"],
                "name": "AgroPro S1 Precision Electric Sprayer (18L)",
                "price": Decimal("4290.00"),
                "stock_quantity": 12,
                "lab_germination_pct": None,
                "purity_rating": None,
                "specifications_json": {
                    "Working Pressure": "4.5 - 6.5 Bar Variable",
                    "Tank Volume": "18 Liters",
                    "Battery Runtime": "8.5 Hours Continuous",
                    "Dry Weight": "4.2 kg (Ultra-Lightweight)",
                    "Nozzle Fittings": "Solid Brass & Flat Fan",
                },
            },
            {
                "sku": "AGRI-CARE-ELIXIR-500",
                "category": cat_map["care"],
                "name": "Flora Vital Organic Botanical Crop Elixir (500ml)",
                "price": Decimal("890.00"),
                "stock_quantity": 55,
                "lab_germination_pct": None,
                "purity_rating": Decimal("99.80"),
                "specifications_json": {
                    "Active Ingredients": "Cold Ascophyllum Nodosum + Potassium Humate",
                    "Organic Certification": "NPOP & USDA Organic",
                    "PH Value": "6.2 - 6.8 Balanced",
                    "Dilution Ratio": "2 ml per Liter Water",
                },
            },
            {
                "sku": "AGRI-TOOL-SHEAR-SK5",
                "category": cat_map["tools"],
                "name": "Hand-Forged Ash-Wood Pruning Shears",
                "price": Decimal("1250.00"),
                "stock_quantity": 25,
                "lab_germination_pct": None,
                "purity_rating": None,
                "specifications_json": {
                    "Blade Hardness": "58 - 60 HRC",
                    "Blade Material": "High Carbon Tool Steel",
                    "Handle": "European Ash Wood",
                    "Cutting Diameter": "Up to 25 mm fresh branch",
                },
            },
            {
                "sku": "AGRI-IRR-DRIP-05",
                "category": cat_map["irrigation"],
                "name": "Brass Micro-Mist Greenhouse Drip System (0.5 Acre)",
                "price": Decimal("6800.00"),
                "stock_quantity": 8,
                "lab_germination_pct": None,
                "purity_rating": None,
                "specifications_json": {
                    "Acreage Coverage": "0.5 Acre (2000 m2)",
                    "Water Savings": "Up to 65% vs Flood",
                    "Working Pressure": "1.5 - 3.0 Bar",
                    "Included Filter": "Mesh 120 Disc Core",
                },
            },
            {
                "sku": "AGRI-CARE-BIO-NPK-1L",
                "category": cat_map["care"],
                "name": "Solum Bio-NPK Microbial Inoculant (1L)",
                "price": Decimal("460.00"),
                "stock_quantity": 70,
                "lab_germination_pct": None,
                "purity_rating": Decimal("99.90"),
                "specifications_json": {
                    "Bacterial Count": "1 x 10^9 CFU / ml",
                    "Species": "Azotobacter, Bacillus, Frateuria",
                    "Shelf Life": "14 Months at room temp",
                    "Application": "Drip or Seed Inoculation",
                },
            },
        ]
        for pdata in products_data:
            Product.objects.get_or_create(sku=pdata["sku"], defaults=pdata)
        self.stdout.write(self.style.SUCCESS("  [+] Seeded 6 Products"))

        # 4. Equipment Fleet
        fleet_data = [
            {
                "name": "John Deere 5310 4WD Heavy Tractor (55 HP)",
                "model": "5310 4WD GearPro",
                "horsepower": 55,
                "rental_rate_daily": Decimal("2400.00"),
                "rental_rate_acre": Decimal("750.00"),
                "driver_daily_fee": Decimal("500.00"),
                "home_pincode": "141001",
                "is_available": True,
                "maintenance_status": Equipment.MaintenanceStatus.READY,
            },
            {
                "name": "Mahindra 575 DI High-Torque Tractor (45 HP)",
                "model": "575 DI Sarpanch",
                "horsepower": 45,
                "rental_rate_daily": Decimal("1900.00"),
                "rental_rate_acre": Decimal("650.00"),
                "driver_daily_fee": Decimal("450.00"),
                "home_pincode": "360001",
                "is_available": True,
                "maintenance_status": Equipment.MaintenanceStatus.READY,
            },
            {
                "name": "Kubota DC-68G Self-Propelled Paddy Harvester",
                "model": "DC-68G Track",
                "horsepower": 68,
                "rental_rate_daily": Decimal("5800.00"),
                "rental_rate_acre": Decimal("1400.00"),
                "driver_daily_fee": Decimal("800.00"),
                "home_pincode": "132001",
                "is_available": True,
                "maintenance_status": Equipment.MaintenanceStatus.READY,
            },
            {
                "name": "AgroFlyer Pro 16L Autonomous Crop Spray Drone",
                "model": "AF-16X Hexacopter",
                "horsepower": 12,
                "rental_rate_daily": Decimal("3200.00"),
                "rental_rate_acre": Decimal("350.00"),
                "driver_daily_fee": Decimal("600.00"),
                "home_pincode": "452001",
                "is_available": True,
                "maintenance_status": Equipment.MaintenanceStatus.READY,
            },
            {
                "name": "Shaktiman Regular Series 6ft Rotary Tiller",
                "model": "SRT-6 Boron Steel",
                "horsepower": 40,
                "rental_rate_daily": Decimal("950.00"),
                "rental_rate_acre": Decimal("300.00"),
                "driver_daily_fee": Decimal("0.00"),
                "home_pincode": "141001",
                "is_available": True,
                "maintenance_status": Equipment.MaintenanceStatus.READY,
            },
        ]
        for eq in fleet_data:
            Equipment.objects.get_or_create(model=eq["model"], defaults=eq)
        self.stdout.write(self.style.SUCCESS("  [+] Seeded 5 Equipment Fleet Units"))

        # 5. Mandi APMCs
        apmcs = [
            ("Ludhiana APMC", "Punjab", "Ludhiana", "PB-LDH-01", 30.9010, 75.8573),
            ("Alwar APMC", "Rajasthan", "Alwar", "RJ-ALW-01", 27.5530, 76.6346),
            ("Rajkot APMC", "Gujarat", "Rajkot", "GJ-RJK-01", 22.3039, 70.8022),
            ("Karnal APMC", "Haryana", "Karnal", "HR-KRN-01", 29.6857, 76.9905),
            ("Indore APMC", "Madhya Pradesh", "Indore", "MP-IND-01", 22.7196, 75.8577),
            ("Guntur APMC", "Andhra Pradesh", "Guntur", "AP-GNT-01", 16.3067, 80.4365),
        ]
        apmc_map = {}
        for name, state, dist, code, lat, lon in apmcs:
            a, _ = APMC.objects.get_or_create(
                market_code=code,
                defaults={"name": name, "state": state, "district": dist, "latitude": Decimal(str(lat)), "longitude": Decimal(str(lon))},
            )
            apmc_map[code] = a
        self.stdout.write(self.style.SUCCESS("  [+] Seeded 6 APMC Mandis"))

        # 6. Commodities & Daily Tickers
        commodities = [
            ("Paddy Sona Masoori A1", "PAD-SONA", "PDY-SONA-A1", "Sona Masoori Grade-A (Aged 12m)", "Cereals", Decimal("2300.00"), Decimal("2680.00"), "HR-KRN-01", 2850, 2780, 2890, 5800, Decimal("11.00"), Decimal("0.50"), Decimal("35.00")),
            ("Paddy Gujarat PR-106", "PAD-PR106", "PDY-GUJ-PR1", "PR-106 Export Slender Grain", "Cereals", Decimal("2183.00"), Decimal("2180.00"), "GJ-RJK-01", 2240, 2190, 2280, 4200, Decimal("12.00"), Decimal("0.50"), Decimal("30.00")),
            ("Wheat Sharbati Golden", "WHEAT-SHAR", "WHT-SHAR-G1", "Sharbati High-Gluten Golden Grain", "Cereals", Decimal("2275.00"), Decimal("3250.00"), "PB-LDH-01", 3450, 3380, 3490, 4200, Decimal("10.50"), Decimal("0.50"), Decimal("40.00")),
            ("Mustard Seed Yellow 42%", "MUST-YEL", "MUST-RAJ-O42", "Yellow Sarson High-Oil Purity 98%", "Oilseeds", Decimal("5450.00"), Decimal("5450.00"), "RJ-ALW-01", 5720, 5600, 5780, 2800, Decimal("8.00"), Decimal("0.50"), Decimal("50.00")),
            ("Cotton Shankar-6 29mm", "COTTON-S6", "COTN-GUJ-S6", "Shankar-6 Machine Picked 29mm Staple", "Fibre", Decimal("6620.00"), Decimal("7050.00"), "GJ-RJK-01", 7140, 7080, 7240, 6400, Decimal("8.50"), Decimal("0.50"), Decimal("60.00")),
            ("Desi Chana Machine Clean", "CHNA-DESI", "CHNA-DESI-B", "Desi Chana Bold Kernel Machine Cleaned", "Pulses", Decimal("5440.00"), Decimal("5600.00"), "MP-IND-01", 5820, 5740, 5880, 3100, Decimal("9.50"), Decimal("0.50"), Decimal("45.00")),
        ]
        today = date.today()
        for cname, code, ticker, variety, cat, msp, agmarknet, apmc_code, modal, min_p, max_p, volume, basis_m, tol_m, disc_m in commodities:
            c, _ = Commodity.objects.update_or_create(
                code=code,
                defaults={
                    "name": cname,
                    "ticker_symbol": ticker,
                    "variety": variety,
                    "category": cat,
                    "standard_msp_rate": msp,
                    "agmarknet_modal_rate": agmarknet,
                    "basis_moisture_pct": basis_m,
                    "moisture_tolerance_pct": tol_m,
                    "moisture_discount_rate_per_pct": disc_m,
                    "max_rejection_moisture_pct": Decimal("14.00"),
                },
            )
            DailyTicker.objects.update_or_create(
                mandi=apmc_map[apmc_code],
                commodity=c,
                recorded_at=today,
                source="AGMARKNET",
                defaults={
                    "modal_price": Decimal(str(modal)),
                    "min_price": Decimal(str(min_p)),
                    "max_price": Decimal(str(max_p)),
                    "arrivals_volume": Decimal(str(volume)),
                },
            )
        self.stdout.write(self.style.SUCCESS("  [+] Seeded 6 Standardized Ticker Contracts with Live APMC Tickers"))

        # 7. Initial Active Auction Lots
        wheat_comm = Commodity.objects.get(code="WHEAT-SHAR")
        must_comm = Commodity.objects.get(code="MUST-BLK")
        paddy_comm = Commodity.objects.get(code="PAD-BASM")

        lots_data = [
            (farmer_user, wheat_comm, apmc_map["PB-LDH-01"], Decimal("150.000"), Decimal("11.2"), Decimal("2400.00")),
            (farmer_user, must_comm, apmc_map["RJ-ALW-01"], Decimal("80.000"), Decimal("7.8"), Decimal("5600.00")),
            (farmer_user, paddy_comm, apmc_map["HR-KRN-01"], Decimal("220.000"), Decimal("12.5"), Decimal("4350.00")),
        ]
        for farmer, comm, apmc, qty, moist, reserve in lots_data:
            AuctionLot.objects.get_or_create(
                farmer=farmer,
                commodity=comm,
                apmc=apmc,
                defaults={
                    "quantity_quintals": qty,
                    "moisture_pct": moist,
                    "reserve_price": reserve,
                    "current_highest_bid": reserve,
                    "status": AuctionLot.Status.ACTIVE,
                    "expires_at": timezone.now() + timedelta(days=2),
                },
            )
        self.stdout.write(self.style.SUCCESS("  [+] Seeded 3 Active Mandi Auction Lots"))
        self.stdout.write(self.style.SUCCESS("[OK] All master catalog data successfully seeded!"))
