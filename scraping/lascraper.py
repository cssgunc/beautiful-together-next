import unittest
from unittest.mock import patch, Mock
import requests
from lukescrape import insert_data  

class TestWebScraper(unittest.TestCase):
    
    @patch('requests.get')
    def test_fetch_webpage(self, mock_get):
        # Mock the response
        mock_get.return_value = Mock(status_code=200, text="<html></html>")
        
        url = "https://beautifultogethersanctuary.com/available-dogs/"
        response = requests.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertIn("<html>", response.text)

    @patch('supabase.create_client')
    def test_insert_data(self, mock_create_client):
        mock_supabase = Mock()
        mock_create_client.return_value = mock_supabase
        
        data = [{"name": "Fluffy", "breed": "Labrador", "age": "2", "type": "Dog"}]
        insert_data(data)
        
        # Ensure insert was called
        mock_supabase.table.return_value.insert.return_value.execute.return_value.status_code = 201
        self.assertTrue(mock_supabase.table.return_value.insert.called)

if __name__ == '__main__':
    unittest.main()