import React, { useState } from "react";
import { XCircle, Brain } from "lucide-react";
import InputField from "./InputField";

const PredictionForm = ({ isVisible, onPredict, onClose, isLoading }) => {
  const [formData, setFormData] = useState({
    deposit_type: '',
    country: '',
    lead_time: '',
    agent: '',
    adr: '',
    arrival_date_day_of_month: '',
    total_of_special_requests: '',
    arrival_date_week_number: '',
    total_stay: '',
    booking_ratio: '',
    arrival_date_month: '',
    market_segment: '',
    customer_type: '',
    assigned_room_type: '',
    required_car_parking_spaces: '',
    meal: '',
    booking_changes: '',
    distribution_channel: '',
    reserved_room_type: '',
    adults: 0,
    children: 0,
    babies: 0, // Added babies field
    total_guests: 0,
    check_in: '',
    check_out: '',
    previous_bookings: 0,
    cancelled_bookings: 0
  });

  // Handle normal text/number fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle adults + children + babies → total_guests
  const handleGuestChange = (e) => {
    const { name, value } = e.target;
    const intValue = Math.max(0, parseInt(value || "0", 10)); // only integers >=0
    setFormData(prev => {
      const updated = { ...prev, [name]: intValue };
      // Updated to include babies
      updated.total_guests = (updated.adults || 0) + (updated.children || 0) + (updated.babies || 0); 
      return updated;
    });
  };

  // Handle check-in/check-out → stay length, week number, month
  const handleDateChange = (type, value) => {
    setFormData(prev => {
      const updated = { ...prev, [type]: value };

      if (updated.check_in && updated.check_out) {
        const checkInDate = new Date(updated.check_in);
        const checkOutDate = new Date(updated.check_out);
        const diffTime = checkOutDate - checkInDate;
        const nights = diffTime / (1000 * 60 * 60 * 24);

        updated.total_stay = nights > 0 ? nights : 0;
        updated.arrival_date_day_of_month = checkInDate.getDate();
        updated.arrival_date_month = checkInDate.toLocaleString("default", { month: "long" });
        updated.arrival_date_week_number = Math.ceil(
          (checkInDate.getDate() + new Date(checkInDate.getFullYear(), checkInDate.getMonth(), 1).getDay()) / 7
        );
      }
      return updated;
    });
  };

  // Handle bookings → booking ratio
  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    const intValue = Math.max(0, parseInt(value || 0, 10));
    setFormData(prev => {
      const updated = { ...prev, [name]: intValue };
      const total = (updated.previous_bookings || 0) + (updated.cancelled_bookings || 0);
      updated.booking_ratio = total > 0 ? updated.previous_bookings / total : 0;
      return updated;
    });
  };

  const handleSubmit = () => {
    onPredict(formData);
  };

  // Dropdowns (adjust values as per dataset)
  const monthOptions = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ].map(m => ({ value: m, label: m }));

  const depositTypeOptions = [
    { value: 'No Deposit', label: 'No Deposit' },
    { value: 'Refundable', label: 'Refundable' },
    { value: 'Non Refund', label: 'Non Refund' }
  ];

  const mealOptions = [
    { value: 'BB', label: 'Bed & Breakfast' },
    { value: 'FB', label: 'Full Board' },
    { value: 'HB', label: 'Half Board' },
    { value: 'SC', label: 'Self Catering' }
  ];

  const marketSegmentOptions = [
    { value: 'Online TA', label: 'Online TA' },
    { value: 'Corporate', label: 'Corporate' },
    { value: 'Direct', label: 'Direct' },
    { value: 'Offline TA/TO', label: 'Offline TA/TO' },
    { value: 'Groups', label: 'Groups' }
  ];

  const customerTypeOptions = [
    { value: 'Transient', label: 'Transient' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Transient-Party', label: 'Transient-Party' },
    { value: 'Group', label: 'Group' }
  ];

  const distributionChannelOptions = [
    { value: 'TA/TO', label: 'TA/TO' },
    { value: 'Corporate', label: 'Corporate' },
    { value: 'Direct', label: 'Direct' }
  ];

  const reservedRoomTypeOptions = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' },
    { value: 'E', label: 'E' },
    { value: 'F', label: 'F' },
    { value: 'G', label: 'G' },
    { value: 'H', label: 'H' },
    { value: 'I', label: 'I' },
    { value: 'J', label: 'J' },
    { value: 'K', label: 'K' },
    { value: 'L', label: 'L' }
  ];

  const assignedRoomTypeOptions = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' },
    { value: 'E', label: 'E' },
    { value: 'F', label: 'F' },
    { value: 'G', label: 'G' },
    { value: 'H', label: 'H' },
    { value: 'I', label: 'I' },
    { value: 'J', label: 'J' },
    { value: 'K', label: 'K' },
    { value: 'L', label: 'L' }
  ];

  // Country options from the provided data
  const countryOptions = [
    { value: 'PRT', label: 'PRT' },
    { value: 'GBR', label: 'GBR' },
    { value: 'ESP', label: 'ESP' },
    { value: 'IRL', label: 'IRL' },
    { value: 'DEU', label: 'DEU' },
    { value: 'FRA', label: 'FRA' },
    { value: 'ITA', label: 'ITA' },
    { value: 'ROU', label: 'ROU' },
    { value: 'NOR', label: 'NOR' },
    { value: 'OMN', label: 'OMN' },
    { value: 'ARG', label: 'ARG' },
    { value: 'POL', label: 'POL' },
    { value: 'BEL', label: 'BEL' },
    { value: 'CHE', label: 'CHE' },
    { value: 'CN', label: 'CN' },
    { value: 'GRC', label: 'GRC' },
    { value: 'NLD', label: 'NLD' },
    { value: 'DNK', label: 'DNK' },
    { value: 'RUS', label: 'RUS' },
    { value: 'SWE', label: 'SWE' },
    { value: 'AUS', label: 'AUS' },
    { value: 'EST', label: 'EST' },
    { value: 'CZE', label: 'CZE' },
    { value: 'BRA', label: 'BRA' },
    { value: 'FIN', label: 'FIN' },
    { value: 'MOZ', label: 'MOZ' },
    { value: 'BWA', label: 'BWA' },
    { value: 'LUX', label: 'LUX' },
    { value: 'SVN', label: 'SVN' },
    { value: 'ALB', label: 'ALB' },
    { value: 'IND', label: 'IND' },
    { value: 'CHN', label: 'CHN' },
    { value: 'MEX', label: 'MEX' },
    { value: 'MAR', label: 'MAR' },
    { value: 'UKR', label: 'UKR' },
    { value: 'SMR', label: 'SMR' },
    { value: 'LVA', label: 'LVA' },
    { value: 'PRI', label: 'PRI' },
    { value: 'SRB', label: 'SRB' },
    { value: 'CHL', label: 'CHL' },
    { value: 'AUT', label: 'AUT' },
    { value: 'BLR', label: 'BLR' },
    { value: 'LTU', label: 'LTU' },
    { value: 'TUR', label: 'TUR' },
    { value: 'ZAF', label: 'ZAF' },
    { value: 'ISR', label: 'ISR' },
    { value: 'CYM', label: 'CYM' },
    { value: 'ZMB', label: 'ZMB' },
    { value: 'CPV', label: 'CPV' },
    { value: 'ZWE', label: 'ZWE' },
    { value: 'DZA', label: 'DZA' },
    { value: 'KOR', label: 'KOR' },
    { value: 'CRI', label: 'CRI' },
    { value: 'HUN', label: 'HUN' },
    { value: 'ARE', label: 'ARE' },
    { value: 'TUN', label: 'TUN' },
    { value: 'JAM', label: 'JAM' },
    { value: 'HRV', label: 'HRV' },
    { value: 'HKG', label: 'HKG' },
    { value: 'IRN', label: 'IRN' },
    { value: 'GEO', label: 'GEO' },
    { value: 'AND', label: 'AND' },
    { value: 'GIB', label: 'GIB' },
    { value: 'URY', label: 'URY' },
    { value: 'JEY', label: 'JEY' },
    { value: 'CAF', label: 'CAF' },
    { value: 'CYP', label: 'CYP' },
    { value: 'COL', label: 'COL' },
    { value: 'GGY', label: 'GGY' },
    { value: 'KWT', label: 'KWT' },
    { value: 'NGA', label: 'NGA' },
    { value: 'MDV', label: 'MDV' },
    { value: 'VEN', label: 'VEN' },
    { value: 'SVK', label: 'SVK' },
    { value: 'AGO', label: 'AGO' },
    { value: 'FJI', label: 'FJI' },
    { value: 'KAZ', label: 'KAZ' },
    { value: 'PAK', label: 'PAK' },
    { value: 'IDN', label: 'IDN' },
    { value: 'LBN', label: 'LBN' },
    { value: 'PHL', label: 'PHL' },
    { value: 'SEN', label: 'SEN' },
    { value: 'SYC', label: 'SYC' },
    { value: 'AZE', label: 'AZE' },
    { value: 'BHR', label: 'BHR' },
    { value: 'NZL', label: 'NZL' },
    { value: 'THA', label: 'THA' },
    { value: 'DOM', label: 'DOM' },
    { value: 'MKD', label: 'MKD' },
    { value: 'MYS', label: 'MYS' },
    { value: 'ARM', label: 'ARM' },
    { value: 'JPN', label: 'JPN' },
    { value: 'LKA', label: 'LKA' },
    { value: 'CUB', label: 'CUB' },
    { value: 'CMR', label: 'CMR' },
    { value: 'BIH', label: 'BIH' },
    { value: 'MUS', label: 'MUS' },
    { value: 'COM', label: 'COM' },
    { value: 'SUR', label: 'SUR' },
    { value: 'UGA', label: 'UGA' },
    { value: 'BGR', label: 'BGR' },
    { value: 'CIV', label: 'CIV' },
    { value: 'JOR', label: 'JOR' },
    { value: 'SYR', label: 'SYR' },
    { value: 'SGP', label: 'SGP' },
    { value: 'BDI', label: 'BDI' },
    { value: 'SAU', label: 'SAU' },
    { value: 'VNM', label: 'VNM' },
    { value: 'PLW', label: 'PLW' },
    { value: 'EGY', label: 'EGY' },
    { value: 'PER', label: 'PER' },
    { value: 'MLT', label: 'MLT' },
    { value: 'MWI', label: 'MWI' },
    { value: 'ECU', label: 'ECU' },
    { value: 'MDG', label: 'MDG' },
    { value: 'ISL', label: 'ISL' },
    { value: 'UZB', label: 'UZB' },
    { value: 'NPL', label: 'NPL' },
    { value: 'BHS', label: 'BHS' },
    { value: 'MAC', label: 'MAC' },
    { value: 'TGO', label: 'TGO' },
    { value: 'TWN', label: 'TWN' },
    { value: 'DJI', label: 'DJI' },
    { value: 'STP', label: 'STP' },
    { value: 'KNA', label: 'KNA' },
    { value: 'ETH', label: 'ETH' },
    { value: 'IRQ', label: 'IRQ' },
    { value: 'HND', label: 'HND' },
    { value: 'RWA', label: 'RWA' },
    { value: 'QAT', label: 'QAT' },
    { value: 'KHM', label: 'KHM' },
    { value: 'MCO', label: 'MCO' },
    { value: 'BGD', label: 'BGD' },
    { value: 'IMN', label: 'IMN' },
    { value: 'TJK', label: 'TJK' },
    { value: 'NIC', label: 'NIC' },
    { value: 'BEN', label: 'BEN' },
    { value: 'VGB', label: 'VGB' },
    { value: 'TZA', label: 'TZA' },
    { value: 'GAB', label: 'GAB' },
    { value: 'GHA', label: 'GHA' },
    { value: 'TMP', label: 'TMP' },
    { value: 'GLP', label: 'GLP' },
    { value: 'KEN', label: 'KEN' },
    { value: 'LIE', label: 'LIE' },
    { value: 'GNB', label: 'GNB' },
    { value: 'MNE', label: 'MNE' },
    { value: 'UMI', label: 'UMI' },
    { value: 'MYT', label: 'MYT' },
    { value: 'FRO', label: 'FRO' },
    { value: 'MMR', label: 'MMR' },
    { value: 'PAN', label: 'PAN' },
    { value: 'BFA', label: 'BFA' },
    { value: 'LBY', label: 'LBY' },
    { value: 'MLI', label: 'MLI' },
    { value: 'NAM', label: 'NAM' },
    { value: 'BOL', label: 'BOL' },
    { value: 'PRY', label: 'PRY' },
    { value: 'BRB', label: 'BRB' },
    { value: 'ABW', label: 'ABW' },
    { value: 'AIA', label: 'AIA' },
    { value: 'SLV', label: 'SLV' },
    { value: 'DMA', label: 'DMA' },
    { value: 'PYF', label: 'PYF' },
    { value: 'GUY', label: 'GUY' },
    { value: 'LCA', label: 'LCA' },
    { value: 'ATA', label: 'ATA' },
    { value: 'GTM', label: 'GTM' },
    { value: 'ASM', label: 'ASM' },
    { value: 'MRT', label: 'MRT' },
    { value: 'NCL', label: 'NCL' },
    { value: 'KIR', label: 'KIR' },
    { value: 'SDN', label: 'SDN' },
    { value: 'ATF', label: 'ATF' },
    { value: 'SLE', label: 'SLE' },
    { value: 'LAO', label: 'LAO' }
  ].map(country => ({ value: country.value, label: country.label }));

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative z-50">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Booking Prediction Form
            </h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XCircle className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InputField label="Deposit Type" name="deposit_type"
              value={formData.deposit_type} onChange={handleChange} options={depositTypeOptions} />

            <InputField label="Country" name="country"
              value={formData.country} onChange={handleChange} options={countryOptions} />

            <InputField label="Lead Time (days)" name="lead_time" type="number"
              value={formData.lead_time} onChange={handleChange} placeholder="Days before arrival" />

            {/* Changed Agent to integer input */}
            <InputField label="Agent" name="agent" type="number" step="1" min="0"
              value={formData.agent} onChange={handleChange} placeholder="Agent ID" />

            <InputField label="Average Daily Rate" name="adr" type="number"
              value={formData.adr} onChange={handleChange} placeholder="Rate" />

            <InputField 
              label="Adults" 
              name="adults" 
              type="number" 
              min="0" 
              step="1"
              value={formData.adults} 
              onChange={handleGuestChange} 
              placeholder="No. of Adults" 
            />

            <InputField 
              label="Children" 
              name="children" 
              type="number" 
              min="0" 
              step="1"
              value={formData.children} 
              onChange={handleGuestChange} 
              placeholder="No. of Children" 
            />
            
            {/* Added Babies input */}
            <InputField 
              label="Babies" 
              name="babies" 
              type="number" 
              min="0" 
              step="1"
              value={formData.babies} 
              onChange={handleGuestChange} 
              placeholder="No. of Babies" 
            />

            <InputField label="Check-In" name="check_in" type="date"
              value={formData.check_in} onChange={(e) => handleDateChange("check_in", e.target.value)} />

            <InputField label="Check-Out" name="check_out" type="date"
              value={formData.check_out} onChange={(e) => handleDateChange("check_out", e.target.value)} />

            {/* Changed Special Requests to integer input */}
            <InputField label="Special Requests" name="total_of_special_requests" type="number" step="1" min="0"
              value={formData.total_of_special_requests} onChange={handleChange} placeholder="Number of requests" />

            <InputField 
              label="Previous Bookings Not Cancelled" 
              name="previous_bookings" 
              type="number" 
              min="0" 
              step="1"
              value={formData.previous_bookings} 
              onChange={handleBookingChange} 
              placeholder="Confirmed" 
            />

            <InputField 
              label="Cancelled Bookings" 
              name="cancelled_bookings" 
              type="number" 
              min="0" 
              step="1"
              value={formData.cancelled_bookings} 
              onChange={handleBookingChange} 
              placeholder="Cancelled" 
            />

            <InputField label="Arrival Month" name="arrival_date_month"
              value={formData.arrival_date_month} onChange={handleChange} options={monthOptions} />

            <InputField label="Market Segment" name="market_segment"
              value={formData.market_segment} onChange={handleChange} options={marketSegmentOptions} />

            <InputField label="Customer Type" name="customer_type"
              value={formData.customer_type} onChange={handleChange} options={customerTypeOptions} />

            <InputField label="Assigned Room Type" name="assigned_room_type"
              value={formData.assigned_room_type} onChange={handleChange} options={assignedRoomTypeOptions} />

            <InputField label="Car Parking Spaces" name="required_car_parking_spaces" type="number" step="1" min="0"
              value={formData.required_car_parking_spaces} onChange={handleChange} placeholder="Spaces" />

            <InputField label="Meal Plan" name="meal"
              value={formData.meal} onChange={handleChange} options={mealOptions} />

            {/* Changed Booking Changes to integer input */}
            <InputField label="Booking Changes" name="booking_changes" type="number" step="1" min="0"
              value={formData.booking_changes} onChange={handleChange} placeholder="Changes" />

            <InputField label="Distribution Channel" name="distribution_channel"
              value={formData.distribution_channel} onChange={handleChange} options={distributionChannelOptions} />

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Reserved Room Type
              </label>
              <select
                name="reserved_room_type"
                value={formData.reserved_room_type}
                onChange={handleChange}
                className="w-full border rounded p-2"
              >
                {reservedRoomTypeOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2 lg:col-span-3 pt-6">
              <button 
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Predicting...</span>
                  </>
                ) : (
                  <>
                    <Brain className="h-5 w-5" />
                    <span>Generate Prediction</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionForm;