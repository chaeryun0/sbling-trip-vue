/**
 * 주소를 포맷팅하는 함수
 * @param {String} address - 원본 주소
 * @returns {String} 포맷팅된 주소
 */
export const formatLocation = (address) => {
  const [province, city] = address.split(" ", 2);
  const filteredProvince = province.slice(0, 2);
  return `${filteredProvince} ∙ ${city}`;
};

/**
 * 괄호를 제거하는 함수
 * @param {String} str - 원본 문자열
 * @returns {String} 괄호가 제거된 문자열
 */
export const removeParentheses = (str) => str?.replace(/\((.*?)\)/g, "").trim();

/**
 * 숙소 리스트를 포맷팅하는 함수
 * @param {Array} data - 원본 숙소 데이터 배열
 * @returns {Array} 포맷팅된 숙소 데이터 배열
 */
export const formatStays = (data) =>
  data.map((stay) => ({
    ...stay,
    stayName: removeParentheses(stay.stayName),
    originalAddress: stay.address,
    formattedAddress: formatLocation(stay.address),
  }));
