"""
Script to initialize the database with mock data from frontend
Run this script to populate the MongoDB with initial data
"""
import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Mock data
mock_products = [
    {
        "id": "product-1",
        "name": "Cimento Itau - Pacote 10 Sacos",
        "description": "Cimento Portland CP II-E-32, ideal para construções residenciais e comerciais. Cada saco contém 50kg de cimento de alta qualidade.",
        "price": 280.0,
        "originalPrice": 350.0,
        "quantity": 10,
        "unit": "sacos",
        "weight": "50kg por saco",
        "freeShipping": True,
        "discount": 20,
        "popular": False,
        "image": "https://customer-assets.emergentagent.com/job_cimento-ofertas/artifacts/5i1lhj0r_cimento.jpg",
        "specifications": [
            "Cimento Portland CP II-E-32",
            "Conformidade NBR 11578",
            "Alta resistência e durabilidade", 
            "Ideal para concreto e argamassa",
            "Baixo calor de hidratação"
        ]
    },
    {
        "id": "product-2",
        "name": "Cimento Itau - Pacote 20 Sacos",
        "description": "Pacote econômico com 20 sacos de cimento Portland CP II-E-32. Perfeito para obras maiores com excelente custo-benefício.",
        "price": 489.0,
        "originalPrice": 650.0,
        "quantity": 20,
        "unit": "sacos", 
        "weight": "50kg por saco",
        "freeShipping": True,
        "discount": 25,
        "popular": True,
        "image": "https://customer-assets.emergentagent.com/job_cimento-ofertas/artifacts/anykxehy_cimento.2.jpg",
        "specifications": [
            "Cimento Portland CP II-E-32",
            "Conformidade NBR 11578",
            "Alta resistência e durabilidade",
            "Ideal para concreto e argamassa", 
            "Baixo calor de hidratação",
            "Melhor custo-benefício"
        ]
    }
]

mock_stock = {
    "id": "stock-1",
    "totalAvailable": 200,
    "sold": 43,
    "remaining": 157
}

mock_testimonials = [
    {
        "id": "testimonial-1",
        "name": "João Silva",
        "rating": 5,
        "comment": "Cimento de excelente qualidade! Chegou rapidinho e o preço estava imbatível. Já usei em várias obras.",
        "date": "2025-01-10"
    },
    {
        "id": "testimonial-2",
        "name": "Maria Santos",
        "rating": 5,
        "comment": "Muito satisfeita com a compra. O frete grátis fez toda diferença no orçamento da obra.",
        "date": "2025-01-08"
    },
    {
        "id": "testimonial-3",
        "name": "Carlos Oliveira", 
        "rating": 5,
        "comment": "Produto original, entrega no prazo e preço excelente. Recomendo!",
        "date": "2025-01-05"
    }
]

async def init_database():
    # MongoDB connection
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    try:
        print("Initializing database with mock data...")
        
        # Clear existing data
        await db.products.delete_many({})
        await db.stock.delete_many({})
        await db.testimonials.delete_many({})
        
        # Insert products
        await db.products.insert_many(mock_products)
        print(f"Inserted {len(mock_products)} products")
        
        # Insert stock
        await db.stock.insert_one(mock_stock)
        print("Inserted stock data")
        
        # Insert testimonials
        await db.testimonials.insert_many(mock_testimonials)
        print(f"Inserted {len(mock_testimonials)} testimonials")
        
        print("Database initialization completed successfully!")
        
    except Exception as e:
        print(f"Error initializing database: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(init_database())