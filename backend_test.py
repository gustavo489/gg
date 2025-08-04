#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Cement Sales Application
Tests all CRUD operations for Products, Stock, and Testimonials APIs
"""

import requests
import json
import sys
from datetime import datetime
import uuid

# Backend URL from frontend environment
BACKEND_URL = "https://0459d984-cc65-4e30-b2b7-edcb4654aa65.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.test_results = {
            "passed": 0,
            "failed": 0,
            "errors": []
        }
        
    def log_result(self, test_name, success, message=""):
        if success:
            self.test_results["passed"] += 1
            print(f"✅ {test_name}: PASSED {message}")
        else:
            self.test_results["failed"] += 1
            self.test_results["errors"].append(f"{test_name}: {message}")
            print(f"❌ {test_name}: FAILED {message}")
    
    def test_api_connectivity(self):
        """Test basic API connectivity"""
        try:
            response = requests.get(f"{self.base_url}/", timeout=10)
            if response.status_code == 200:
                self.log_result("API Connectivity", True, f"Status: {response.status_code}")
                return True
            else:
                self.log_result("API Connectivity", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_result("API Connectivity", False, f"Connection error: {str(e)}")
            return False
    
    def test_products_crud(self):
        """Test all Product CRUD operations"""
        print("\n=== Testing Products CRUD Operations ===")
        
        # Test GET /api/products (list all)
        try:
            response = requests.get(f"{self.base_url}/products", timeout=10)
            if response.status_code == 200:
                products = response.json()
                self.log_result("GET /api/products", True, f"Retrieved {len(products)} products")
                initial_count = len(products)
            else:
                self.log_result("GET /api/products", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_result("GET /api/products", False, f"Error: {str(e)}")
            return False
        
        # Test POST /api/products (create new product)
        test_product = {
            "name": "Premium Portland Cement",
            "description": "High-quality cement for construction projects",
            "price": 450.0,
            "originalPrice": 500.0,
            "quantity": 100,
            "unit": "bags",
            "weight": "50kg",
            "freeShipping": True,
            "discount": 10,
            "popular": True,
            "image": "https://example.com/cement.jpg",
            "specifications": ["Grade 53", "IS 12269:2013", "High strength"]
        }
        
        try:
            response = requests.post(f"{self.base_url}/products", 
                                   json=test_product, timeout=10)
            if response.status_code == 200:
                created_product = response.json()
                product_id = created_product["id"]
                self.log_result("POST /api/products", True, f"Created product with ID: {product_id}")
            else:
                self.log_result("POST /api/products", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            self.log_result("POST /api/products", False, f"Error: {str(e)}")
            return False
        
        # Test GET /api/products/{id} (get specific product)
        try:
            response = requests.get(f"{self.base_url}/products/{product_id}", timeout=10)
            if response.status_code == 200:
                product = response.json()
                self.log_result("GET /api/products/{id}", True, f"Retrieved product: {product['name']}")
            else:
                self.log_result("GET /api/products/{id}", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_result("GET /api/products/{id}", False, f"Error: {str(e)}")
        
        # Test PUT /api/products/{id} (update product)
        updated_product = test_product.copy()
        updated_product["name"] = "Updated Premium Portland Cement"
        updated_product["price"] = 475.0
        
        try:
            response = requests.put(f"{self.base_url}/products/{product_id}", 
                                  json=updated_product, timeout=10)
            if response.status_code == 200:
                updated = response.json()
                self.log_result("PUT /api/products/{id}", True, f"Updated product name: {updated['name']}")
            else:
                self.log_result("PUT /api/products/{id}", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_result("PUT /api/products/{id}", False, f"Error: {str(e)}")
        
        # Test DELETE /api/products/{id} (delete product)
        try:
            response = requests.delete(f"{self.base_url}/products/{product_id}", timeout=10)
            if response.status_code == 200:
                self.log_result("DELETE /api/products/{id}", True, "Product deleted successfully")
            else:
                self.log_result("DELETE /api/products/{id}", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_result("DELETE /api/products/{id}", False, f"Error: {str(e)}")
        
        # Test 404 error handling for non-existent product
        try:
            fake_id = str(uuid.uuid4())
            response = requests.get(f"{self.base_url}/products/{fake_id}", timeout=10)
            if response.status_code == 404:
                self.log_result("Product 404 Error Handling", True, "Correctly returned 404 for non-existent product")
            else:
                self.log_result("Product 404 Error Handling", False, f"Expected 404, got {response.status_code}")
        except Exception as e:
            self.log_result("Product 404 Error Handling", False, f"Error: {str(e)}")
    
    def test_stock_api(self):
        """Test Stock API endpoints"""
        print("\n=== Testing Stock API ===")
        
        # Test GET /api/stock
        try:
            response = requests.get(f"{self.base_url}/stock", timeout=10)
            if response.status_code == 200:
                stock = response.json()
                self.log_result("GET /api/stock", True, f"Stock data: Available={stock.get('totalAvailable')}, Sold={stock.get('sold')}, Remaining={stock.get('remaining')}")
                original_stock = stock
            else:
                self.log_result("GET /api/stock", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_result("GET /api/stock", False, f"Error: {str(e)}")
            return False
        
        # Test PUT /api/stock (update stock)
        updated_stock = {
            "totalAvailable": 300,
            "sold": 50,
            "remaining": 250
        }
        
        try:
            response = requests.put(f"{self.base_url}/stock", 
                                  json=updated_stock, timeout=10)
            if response.status_code == 200:
                updated = response.json()
                self.log_result("PUT /api/stock", True, f"Updated stock: Available={updated['totalAvailable']}, Remaining={updated['remaining']}")
            else:
                self.log_result("PUT /api/stock", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_result("PUT /api/stock", False, f"Error: {str(e)}")
    
    def test_testimonials_api(self):
        """Test Testimonials API endpoints"""
        print("\n=== Testing Testimonials API ===")
        
        # Test GET /api/testimonials
        try:
            response = requests.get(f"{self.base_url}/testimonials", timeout=10)
            if response.status_code == 200:
                testimonials = response.json()
                self.log_result("GET /api/testimonials", True, f"Retrieved {len(testimonials)} testimonials")
                initial_count = len(testimonials)
            else:
                self.log_result("GET /api/testimonials", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_result("GET /api/testimonials", False, f"Error: {str(e)}")
            return False
        
        # Test POST /api/testimonials (create new testimonial)
        test_testimonial = {
            "name": "Rajesh Kumar",
            "rating": 5,
            "comment": "Excellent quality cement! Used it for my house construction and very satisfied with the results.",
            "date": "2024-01-15"
        }
        
        try:
            response = requests.post(f"{self.base_url}/testimonials", 
                                   json=test_testimonial, timeout=10)
            if response.status_code == 200:
                created_testimonial = response.json()
                self.log_result("POST /api/testimonials", True, f"Created testimonial from: {created_testimonial['name']}")
            else:
                self.log_result("POST /api/testimonials", False, f"Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_result("POST /api/testimonials", False, f"Error: {str(e)}")
    
    def test_status_api(self):
        """Test existing Status API endpoints"""
        print("\n=== Testing Status API ===")
        
        # Test GET /api/status
        try:
            response = requests.get(f"{self.base_url}/status", timeout=10)
            if response.status_code == 200:
                status_checks = response.json()
                self.log_result("GET /api/status", True, f"Retrieved {len(status_checks)} status checks")
            else:
                self.log_result("GET /api/status", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_result("GET /api/status", False, f"Error: {str(e)}")
        
        # Test POST /api/status
        test_status = {
            "client_name": "Backend Test Client"
        }
        
        try:
            response = requests.post(f"{self.base_url}/status", 
                                   json=test_status, timeout=10)
            if response.status_code == 200:
                created_status = response.json()
                self.log_result("POST /api/status", True, f"Created status check for: {created_status['client_name']}")
            else:
                self.log_result("POST /api/status", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_result("POST /api/status", False, f"Error: {str(e)}")
    
    def test_data_persistence(self):
        """Test that data persists in MongoDB"""
        print("\n=== Testing Data Persistence ===")
        
        # Create a product and verify it persists
        test_product = {
            "name": "Test Persistence Cement",
            "description": "Testing data persistence",
            "price": 400.0,
            "originalPrice": 450.0,
            "quantity": 50,
            "unit": "bags",
            "weight": "50kg",
            "freeShipping": True,
            "discount": 11,
            "popular": False,
            "image": "https://example.com/test.jpg",
            "specifications": ["Test spec"]
        }
        
        try:
            # Create product
            response = requests.post(f"{self.base_url}/products", json=test_product, timeout=10)
            if response.status_code == 200:
                product_id = response.json()["id"]
                
                # Verify it exists by fetching it
                response = requests.get(f"{self.base_url}/products/{product_id}", timeout=10)
                if response.status_code == 200:
                    fetched_product = response.json()
                    if fetched_product["name"] == test_product["name"]:
                        self.log_result("Data Persistence", True, "Product persisted correctly in database")
                    else:
                        self.log_result("Data Persistence", False, "Product data mismatch")
                else:
                    self.log_result("Data Persistence", False, "Could not fetch created product")
                
                # Clean up
                requests.delete(f"{self.base_url}/products/{product_id}", timeout=10)
            else:
                self.log_result("Data Persistence", False, "Could not create test product")
        except Exception as e:
            self.log_result("Data Persistence", False, f"Error: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Comprehensive Backend API Testing")
        print(f"Backend URL: {self.base_url}")
        print("=" * 60)
        
        # Test API connectivity first
        if not self.test_api_connectivity():
            print("\n❌ API connectivity failed. Stopping tests.")
            return False
        
        # Run all API tests
        self.test_products_crud()
        self.test_stock_api()
        self.test_testimonials_api()
        self.test_status_api()
        self.test_data_persistence()
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"✅ Passed: {self.test_results['passed']}")
        print(f"❌ Failed: {self.test_results['failed']}")
        
        if self.test_results["errors"]:
            print("\n🔍 FAILED TESTS:")
            for error in self.test_results["errors"]:
                print(f"  • {error}")
        
        success_rate = (self.test_results["passed"] / (self.test_results["passed"] + self.test_results["failed"])) * 100
        print(f"\n📈 Success Rate: {success_rate:.1f}%")
        
        return self.test_results["failed"] == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All backend tests passed!")
        sys.exit(0)
    else:
        print("\n⚠️  Some backend tests failed. Check the details above.")
        sys.exit(1)