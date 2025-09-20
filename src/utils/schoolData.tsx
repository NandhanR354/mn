export interface School {
  district: string;
  block: string;
  udise_code: string;
  school_name: string;
  category: string;
  area: string;
  management: string;
}

// Function to parse CSV data
export const parseSchoolsCSV = (csvContent: string): School[] => {
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(',');
      return {
        district: values[0]?.trim() || '',
        block: values[1]?.trim() || '',
        udise_code: values[2]?.trim() || '',
        school_name: values[3]?.trim() || '',
        category: values[4]?.trim() || '',
        area: values[5]?.trim() || '',
        management: values[6]?.trim() || '',
      };
    })
    .filter(school => school.udise_code); // Filter out empty entries
};

// Function to search schools by UDISE code or name
export const searchSchools = (schools: School[], query: string): School[] => {
  if (!query.trim()) return [];
  
  const lowercaseQuery = query.toLowerCase();
  
  return schools.filter(school => 
    school.udise_code.toLowerCase().includes(lowercaseQuery) ||
    school.school_name.toLowerCase().includes(lowercaseQuery) ||
    school.district.toLowerCase().includes(lowercaseQuery)
  ).slice(0, 10); // Limit to 10 results for performance
};

// Function to get school by exact UDISE code
export const getSchoolByUDISE = (schools: School[], udiseCode: string): School | null => {
  return schools.find(school => school.udise_code === udiseCode) || null;
};