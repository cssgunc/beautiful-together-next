import unittest
from unittest.mock import patch
from lascraper import insert_data

class TestScraper(unittest.TestCase):

    @patch('lascraper.supabase.table')
    def test_insert_data(self, mock_table):
        mock_response = mock_table.return_value.insert.return_value.execute.return_value
        mock_response.status_code = 201
        
        # Call the function with some test data
        test_data = [{"name": "Fido", "breed": "Labrador", "age": "3", "type": "Dog"}]
        result = insert_data(test_data)

        # Assertions
        mock_table.return_value.insert.assert_called_once_with(test_data)
        self.assertEqual(result, None)

if __name__ == '__main__':
    unittest.main()