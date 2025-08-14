'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Menu, X, Check } from 'lucide-react'
import Retell from 'retell-sdk'
import ReactCountryFlag from 'react-country-flag'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

function PhoneInputComponent(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} autoComplete="tel" id="phone-number" name="phone-number" />;
}

// Expanded country code list covering major international codes
const COUNTRY_CODES = [
  { name: 'Afghanistan', flag: '🇦🇫', code: '+93' },
  { name: 'Albania', flag: '🇦🇱', code: '+355' },
  { name: 'Algeria', flag: '🇩🇿', code: '+213' },
  { name: 'American Samoa', flag: '🇦🇸', code: '+1684' },
  { name: 'Andorra', flag: '🇦🇩', code: '+376' },
  { name: 'Angola', flag: '🇦🇴', code: '+244' },
  { name: 'Anguilla', flag: '🇦🇮', code: '+1264' },
  { name: 'Antarctica', flag: '🇦🇶', code: '+672' },
  { name: 'Antigua & Barbuda', flag: '🇦🇬', code: '+1268' },
  { name: 'Argentina', flag: '🇦🇷', code: '+54' },
  { name: 'Armenia', flag: '🇦🇲', code: '+374' },
  { name: 'Aruba', flag: '🇦🇼', code: '+297' },
  { name: 'Australia', flag: '🇦🇺', code: '+61' },
  { name: 'Austria', flag: '🇦🇹', code: '+43' },
  { name: 'Azerbaijan', flag: '🇦🇿', code: '+994' },
  { name: 'Bahamas', flag: '🇧🇸', code: '+1242' },
  { name: 'Bahrain', flag: '🇧🇭', code: '+973' },
  { name: 'Bangladesh', flag: '🇧🇩', code: '+880' },
  { name: 'Barbados', flag: '🇧🇧', code: '+1246' },
  { name: 'Belarus', flag: '🇧🇾', code: '+375' },
  { name: 'Belgium', flag: '🇧🇪', code: '+32' },
  { name: 'Belize', flag: '🇧🇿', code: '+501' },
  { name: 'Benin', flag: '🇧🇯', code: '+229' },
  { name: 'Bermuda', flag: '🇧🇲', code: '+1441' },
  { name: 'Bhutan', flag: '🇧🇹', code: '+975' },
  { name: 'Bolivia', flag: '🇧🇴', code: '+591' },
  { name: 'Bosnia & Herzegovina', flag: '🇧🇦', code: '+387' },
  { name: 'Botswana', flag: '🇧🇼', code: '+267' },
  { name: 'Brazil', flag: '🇧🇷', code: '+55' },
  { name: 'British Indian Ocean Territory', flag: '🇮🇴', code: '+246' },
  { name: 'Brunei', flag: '🇧🇳', code: '+673' },
  { name: 'Bulgaria', flag: '🇧🇬', code: '+359' },
  { name: 'Burkina Faso', flag: '🇧🇫', code: '+226' },
  { name: 'Burundi', flag: '🇧🇮', code: '+257' },
  { name: 'Cabo Verde', flag: '🇨🇻', code: '+238' },
  { name: 'Cambodia', flag: '🇰🇭', code: '+855' },
  { name: 'Cameroon', flag: '🇨🇲', code: '+237' },
  { name: 'Canada', flag: '🇨🇦', code: '+1' },
  { name: 'Central African Republic', flag: '🇨🇫', code: '+236' },
  { name: 'Chad', flag: '🇹🇩', code: '+235' },
  { name: 'Chile', flag: '🇨🇱', code: '+56' },
  { name: 'China', flag: '🇨🇳', code: '+86' },
  { name: 'Colombia', flag: '🇨🇴', code: '+57' },
  { name: 'Comoros', flag: '🇰🇲', code: '+269' },
  { name: 'Congo - Brazzaville', flag: '🇨🇬', code: '+242' },
  { name: 'Congo - Kinshasa', flag: '🇨🇩', code: '+243' },
  { name: 'Costa Rica', flag: '🇨🇷', code: '+506' },
  { name: 'Croatia', flag: '🇭🇷', code: '+385' },
  { name: 'Cuba', flag: '🇨🇺', code: '+53' },
  { name: 'Cyprus', flag: '🇨🇾', code: '+357' },
  { name: 'Czechia', flag: '🇨🇿', code: '+420' },
  { name: 'Denmark', flag: '🇩🇰', code: '+45' },
  { name: 'Djibouti', flag: '🇩🇯', code: '+253' },
  { name: 'Dominica', flag: '🇩🇲', code: '+1767' },
  { name: 'Dominican Republic', flag: '🇩🇴', code: '+1809' },
  { name: 'Dominican Republic', flag: '🇩🇴', code: '+1829' },
  { name: 'Dominican Republic', flag: '🇩🇴', code: '+1849' },
  { name: 'Ecuador', flag: '🇪🇨', code: '+593' },
  { name: 'Egypt', flag: '🇪🇬', code: '+20' },
  { name: 'El Salvador', flag: '🇸🇻', code: '+503' },
  { name: 'Equatorial Guinea', flag: '🇬🇶', code: '+240' },
  { name: 'Eritrea', flag: '🇪🇷', code: '+291' },
  { name: 'Estonia', flag: '🇪🇪', code: '+372' },
  { name: 'Ethiopia', flag: '🇪🇹', code: '+251' },
  { name: 'Falkland Islands', flag: '🇫🇰', code: '+500' },
  { name: 'Faroe Islands', flag: '🇫🇴', code: '+298' },
  { name: 'Fiji', flag: '🇫🇯', code: '+679' },
  { name: 'Finland', flag: '🇫🇮', code: '+358' },
  { name: 'France', flag: '🇫🇷', code: '+33' },
  { name: 'French Guiana', flag: '🇬🇫', code: '+594' },
  { name: 'French Polynesia', flag: '🇵🇫', code: '+689' },
  { name: 'Gabon', flag: '🇬🇦', code: '+241' },
  { name: 'Gambia', flag: '🇬🇲', code: '+220' },
  { name: 'Georgia', flag: '🇬🇪', code: '+995' },
  { name: 'Germany', flag: '🇩🇪', code: '+49' },
  { name: 'Ghana', flag: '🇬🇭', code: '+233' },
  { name: 'Gibraltar', flag: '🇬🇮', code: '+350' },
  { name: 'Greece', flag: '🇬🇷', code: '+30' },
  { name: 'Greenland', flag: '🇬🇱', code: '+299' },
  { name: 'Grenada', flag: '🇬🇩', code: '+1473' },
  { name: 'Guadeloupe', flag: '🇬🇵', code: '+590' },
  { name: 'Guam', flag: '🇬🇺', code: '+1671' },
  { name: 'Guatemala', flag: '🇬🇹', code: '+502' },
  { name: 'Guernsey', flag: '🇬🇬', code: '+44' },
  { name: 'Guinea', flag: '🇬🇳', code: '+224' },
  { name: 'Guinea-Bissau', flag: '🇬🇼', code: '+245' },
  { name: 'Guyana', flag: '🇬🇾', code: '+592' },
  { name: 'Haiti', flag: '🇭🇹', code: '+509' },
  { name: 'Honduras', flag: '🇭🇳', code: '+504' },
  { name: 'Hong Kong SAR', flag: '🇭🇰', code: '+852' },
  { name: 'Hungary', flag: '🇭🇺', code: '+36' },
  { name: 'Iceland', flag: '🇮🇸', code: '+354' },
  { name: 'India', flag: '🇮🇳', code: '+91' },
  { name: 'Indonesia', flag: '🇮🇩', code: '+62' },
  { name: 'Iran', flag: '🇮🇷', code: '+98' },
  { name: 'Iraq', flag: '🇮🇶', code: '+964' },
  { name: 'Ireland', flag: '🇮🇪', code: '+353' },
  { name: 'Isle of Man', flag: '🇮🇲', code: '+44' },
  { name: 'Israel', flag: '🇮🇱', code: '+972' },
  { name: 'Italy', flag: '🇮🇹', code: '+39' },
  { name: 'Ivory Coast', flag: '🇨🇮', code: '+225' },
  { name: 'Jamaica', flag: '🇯🇲', code: '+1876' },
  { name: 'Japan', flag: '🇯🇵', code: '+81' },
  { name: 'Jersey', flag: '🇯🇪', code: '+44' },
  { name: 'Jordan', flag: '🇯🇴', code: '+962' },
  { name: 'Kazakhstan', flag: '🇰🇿', code: '+7' },
  { name: 'Kenya', flag: '🇰🇪', code: '+254' },
  { name: 'Kiribati', flag: '🇰🇮', code: '+686' },
  { name: 'Kosovo', flag: '🇽🇰', code: '+383' },
  { name: 'Kuwait', flag: '🇰🇼', code: '+965' },
  { name: 'Kyrgyzstan', flag: '🇰🇬', code: '+996' },
  { name: 'Laos', flag: '🇱🇦', code: '+856' },
  { name: 'Latvia', flag: '🇱🇻', code: '+371' },
  { name: 'Lebanon', flag: '🇱🇧', code: '+961' },
  { name: 'Lesotho', flag: '🇱🇸', code: '+266' },
  { name: 'Liberia', flag: '🇱🇷', code: '+231' },
  { name: 'Libya', flag: '🇱🇾', code: '+218' },
  { name: 'Liechtenstein', flag: '🇱🇮', code: '+423' },
  { name: 'Lithuania', flag: '🇱🇹', code: '+370' },
  { name: 'Luxembourg', flag: '🇱🇺', code: '+352' },
  { name: 'Macao SAR', flag: '🇲🇴', code: '+853' },
  { name: 'Macedonia', flag: '🇲🇰', code: '+389' },
  { name: 'Madagascar', flag: '🇲🇬', code: '+261' },
  { name: 'Malawi', flag: '🇲🇼', code: '+265' },
  { name: 'Malaysia', flag: '🇲🇾', code: '+60' },
  { name: 'Maldives', flag: '🇲🇻', code: '+960' },
  { name: 'Mali', flag: '🇲🇱', code: '+223' },
  { name: 'Malta', flag: '🇲🇹', code: '+356' },
  { name: 'Marshall Islands', flag: '🇲🇭', code: '+692' },
  { name: 'Martinique', flag: '🇲🇶', code: '+596' },
  { name: 'Mauritania', flag: '🇲🇷', code: '+222' },
  { name: 'Mauritius', flag: '🇲🇺', code: '+230' },
  { name: 'Mayotte', flag: '🇾🇹', code: '+262' },
  { name: 'Mexico', flag: '🇲🇽', code: '+52' },
  { name: 'Micronesia', flag: '🇫🇲', code: '+691' },
  { name: 'Moldova', flag: '🇲🇩', code: '+373' },
  { name: 'Monaco', flag: '🇲🇨', code: '+377' },
  { name: 'Mongolia', flag: '🇲🇳', code: '+976' },
  { name: 'Montenegro', flag: '🇲🇪', code: '+382' },
  { name: 'Montserrat', flag: '🇲🇸', code: '+1664' },
  { name: 'Morocco', flag: '🇲🇦', code: '+212' },
  { name: 'Mozambique', flag: '🇲🇿', code: '+258' },
  { name: 'Myanmar', flag: '🇲🇲', code: '+95' },
  { name: 'Namibia', flag: '🇳🇦', code: '+264' },
  { name: 'Nauru', flag: '🇳🇷', code: '+674' },
  { name: 'Nepal', flag: '🇳🇵', code: '+977' },
  { name: 'Netherlands', flag: '🇳🇱', code: '+31' },
  { name: 'New Caledonia', flag: '🇳🇨', code: '+687' },
  { name: 'New Zealand', flag: '🇳🇿', code: '+64' },
  { name: 'Nicaragua', flag: '🇳🇮', code: '+505' },
  { name: 'Niger', flag: '🇳🇪', code: '+227' },
  { name: 'Nigeria', flag: '🇳🇬', code: '+234' },
  { name: 'Niue', flag: '🇳🇺', code: '+683' },
  { name: 'Norfolk Island', flag: '🇳🇫', code: '+672' },
  { name: 'Northern Mariana Islands', flag: '🇲🇵', code: '+1670' },
  { name: 'North Korea', flag: '🇰🇵', code: '+850' },
  { name: 'Norway', flag: '🇳🇴', code: '+47' },
  { name: 'Oman', flag: '🇴🇲', code: '+968' },
  { name: 'Pakistan', flag: '🇵🇰', code: '+92' },
  { name: 'Palau', flag: '🇵🇼', code: '+680' },
  { name: 'Palestine', flag: '🇵🇸', code: '+970' },
  { name: 'Panama', flag: '🇵🇦', code: '+507' },
  { name: 'Papua New Guinea', flag: '🇵🇬', code: '+675' },
  { name: 'Paraguay', flag: '🇵🇾', code: '+595' },
  { name: 'Peru', flag: '🇵🇪', code: '+51' },
  { name: 'Philippines', flag: '🇵🇭', code: '+63' },
  { name: 'Poland', flag: '🇵🇱', code: '+48' },
  { name: 'Portugal', flag: '🇵🇹', code: '+351' },
  { name: 'Puerto Rico', flag: '🇵🇷', code: '+1787' },
  { name: 'Puerto Rico', flag: '🇵🇷', code: '+1939' },
  { name: 'Qatar', flag: '🇶🇦', code: '+974' },
  { name: 'Romania', flag: '🇷🇴', code: '+40' },
  { name: 'Russia', flag: '🇷🇺', code: '+7' },
  { name: 'Rwanda', flag: '🇷🇼', code: '+250' },
  { name: 'Réunion', flag: '🇷🇪', code: '+262' },
  { name: 'Samoa', flag: '🇼🇸', code: '+685' },
  { name: 'San Marino', flag: '🇸🇲', code: '+378' },
  { name: 'São Tomé & Príncipe', flag: '🇸🇹', code: '+239' },
  { name: 'Saudi Arabia', flag: '🇸🇦', code: '+966' },
  { name: 'Senegal', flag: '🇸🇳', code: '+221' },
  { name: 'Serbia', flag: '🇷🇸', code: '+381' },
  { name: 'Seychelles', flag: '🇸🇨', code: '+248' },
  { name: 'Sierra Leone', flag: '🇸🇱', code: '+232' },
  { name: 'Singapore', flag: '🇸🇬', code: '+65' },
  { name: 'Slovakia', flag: '🇸🇰', code: '+421' },
  { name: 'Slovenia', flag: '🇸🇮', code: '+386' },
  { name: 'Solomon Islands', flag: '🇸🇧', code: '+677' },
  { name: 'Somalia', flag: '🇸🇴', code: '+252' },
  { name: 'South Africa', flag: '🇿🇦', code: '+27' },
  { name: 'South Korea', flag: '🇰🇷', code: '+82' },
  { name: 'South Sudan', flag: '🇸🇸', code: '+211' },
  { name: 'Spain', flag: '🇪🇸', code: '+34' },
  { name: 'Sri Lanka', flag: '🇱🇰', code: '+94' },
  { name: 'Sudan', flag: '🇸🇩', code: '+249' },
  { name: 'Suriname', flag: '🇸🇷', code: '+597' },
  { name: 'Swaziland', flag: '🇸🇿', code: '+268' },
  { name: 'Sweden', flag: '🇸🇪', code: '+46' },
  { name: 'Switzerland', flag: '🇨🇭', code: '+41' },
  { name: 'Syria', flag: '🇸🇾', code: '+963' },
  { name: 'Taiwan', flag: '🇹🇼', code: '+886' },
  { name: 'Tajikistan', flag: '🇹🇯', code: '+992' },
  { name: 'Tanzania', flag: '🇹🇿', code: '+255' },
  { name: 'Thailand', flag: '🇹🇭', code: '+66' },
  { name: 'Timor-Leste', flag: '🇹🇱', code: '+670' },
  { name: 'Togo', flag: '🇹🇬', code: '+228' },
  { name: 'Tokelau', flag: '🇹🇰', code: '+690' },
  { name: 'Tonga', flag: '🇹🇴', code: '+676' },
  { name: 'Trinidad & Tobago', flag: '🇹🇹', code: '+1868' },
  { name: 'Tunisia', flag: '🇹🇳', code: '+216' },
  { name: 'Turkey', flag: '🇹🇷', code: '+90' },
  { name: 'Turkmenistan', flag: '🇹🇲', code: '+993' },
  { name: 'Turkmenistan', flag: '🇹🇲', code: '+993' },
  { name: 'Turks & Caicos Islands', flag: '🇹🇨', code: '+1649' },
  { name: 'Tuvalu', flag: '🇹🇻', code: '+688' },
  { name: 'Uganda', flag: '🇺🇬', code: '+256' },
  { name: 'Ukraine', flag: '🇺🇦', code: '+380' },
  { name: 'United Arab Emirates', flag: '🇦🇪', code: '+971' },
  { name: 'United Kingdom', flag: '🇬🇧', code: '+44' },
  { name: 'United States', flag: '🇺🇸', code: '+1' },
  { name: 'Uruguay', flag: '🇺🇾', code: '+598' },
  { name: 'Uzbekistan', flag: '🇺🇿', code: '+998' },
  { name: 'Vanuatu', flag: '🇻🇺', code: '+678' },
  { name: 'Vatican City', flag: '🇻🇦', code: '+39' },
  { name: 'Venezuela', flag: '🇻🇪', code: '+58' },
  { name: 'Vietnam', flag: '🇻🇳', code: '+84' },
  { name: 'Yemen', flag: '🇾🇪', code: '+967' },
  { name: 'Zambia', flag: '🇿🇲', code: '+260' },
  { name: 'Zimbabwe', flag: '🇿🇼', code: '+263' },
];

// Add a mapping from country name to ISO 2-letter code for flat flag use
const COUNTRY_NAME_TO_ISO_CODE: Record<string, string> = {
  "Afghanistan": "AF",
  "Albania": "AL",
  "Algeria": "DZ",
  "American Samoa": "AS",
  "Andorra": "AD",
  "Angola": "AO",
  "Anguilla": "AI",
  "Antarctica": "AQ",
  "Antigua & Barbuda": "AG",
  "Argentina": "AR",
  "Armenia": "AM",
  "Aruba": "AW",
  "Australia": "AU",
  "Austria": "AT",
  "Azerbaijan": "AZ",
  "Bahamas": "BS",
  "Bahrain": "BH",
  "Bangladesh": "BD",
  "Barbados": "BB",
  "Belarus": "BY",
  "Belgium": "BE",
  "Belize": "BZ",
  "Benin": "BJ",
  "Bermuda": "BM",
  "Bhutan": "BT",
  "Bolivia": "BO",
  "Bosnia & Herzegovina": "BA",
  "Botswana": "BW",
  "Brazil": "BR",
  "British Indian Ocean Territory": "IO",
  "Brunei": "BN",
  "Bulgaria": "BG",
  "Burkina Faso": "BF",
  "Burundi": "BI",
  "Cabo Verde": "CV",
  "Cambodia": "KH",
  "Cameroon": "CM",
  "Canada": "CA",
  "Central African Republic": "CF",
  "Chad": "TD",
  "Chile": "CL",
  "China": "CN",
  "Colombia": "CO",
  "Comoros": "KM",
  "Congo - Brazzaville": "CG",
  "Congo - Kinshasa": "CD",
  "Costa Rica": "CR",
  "Croatia": "HR",
  "Cuba": "CU",
  "Cyprus": "CY",
  "Czechia": "CZ",
  "Denmark": "DK",
  "Djibouti": "DJ",
  "Dominica": "DM",
  "Dominican Republic": "DO",
  "Ecuador": "EC",
  "Egypt": "EG",
  "El Salvador": "SV",
  "Equatorial Guinea": "GQ",
  "Eritrea": "ER",
  "Estonia": "EE",
  "Ethiopia": "ET",
  "Falkland Islands": "FK",
  "Faroe Islands": "FO",
  "Fiji": "FJ",
  "Finland": "FI",
  "France": "FR",
  "French Guiana": "GF",
  "French Polynesia": "PF",
  "Gabon": "GA",
  "Gambia": "GM",
  "Georgia": "GE",
  "Germany": "DE",
  "Ghana": "GH",
  "Gibraltar": "GI",
  "Greece": "GR",
  "Greenland": "GL",
  "Grenada": "GD",
  "Guadeloupe": "GP",
  "Guam": "GU",
  "Guatemala": "GT",
  "Guernsey": "GG",
  "Guinea": "GN",
  "Guinea-Bissau": "GW",
  "Guyana": "GY",
  "Haiti": "HT",
  "Honduras": "HN",
  "Hong Kong SAR": "HK",
  "Hungary": "HU",
  "Iceland": "IS",
  "India": "IN",
  "Indonesia": "ID",
  "Iran": "IR",
  "Iraq": "IQ",
  "Ireland": "IE",
  "Isle of Man": "IM",
  "Israel": "IL",
  "Italy": "IT",
  "Ivory Coast": "CI",
  "Jamaica": "JM",
  "Japan": "JP",
  "Jersey": "JE",
  "Jordan": "JO",
  "Kazakhstan": "KZ",
  "Kenya": "KE",
  "Kiribati": "KI",
  "Kosovo": "XK",
  "Kuwait": "KW",
  "Kyrgyzstan": "KG",
  "Laos": "LA",
  "Latvia": "LV",
  "Lebanon": "LB",
  "Lesotho": "LS",
  "Liberia": "LR",
  "Libya": "LY",
  "Liechtenstein": "LI",
  "Lithuania": "LT",
  "Luxembourg": "LU",
  "Macao SAR": "MO",
  "Macedonia": "MK",
  "Madagascar": "MG",
  "Malawi": "MW",
  "Malaysia": "MY",
  "Maldives": "MV",
  "Mali": "ML",
  "Malta": "MT",
  "Marshall Islands": "MH",
  "Martinique": "MQ",
  "Mauritania": "MR",
  "Mauritius": "MU",
  "Mayotte": "YT",
  "Mexico": "MX",
  "Micronesia": "FM",
  "Moldova": "MD",
  "Monaco": "MC",
  "Mongolia": "MN",
  "Montenegro": "ME",
  "Montserrat": "MS",
  "Morocco": "MA",
  "Mozambique": "MZ",
  "Myanmar": "MM",
  "Namibia": "NA",
  "Nauru": "NR",
  "Nepal": "NP",
  "Netherlands": "NL",
  "New Caledonia": "NC",
  "New Zealand": "NZ",
  "Nicaragua": "NI",
  "Niger": "NE",
  "Nigeria": "NG",
  "Niue": "NU",
  "Norfolk Island": "NF",
  "Northern Mariana Islands": "MP",
  "North Korea": "KP",
  "Norway": "NO",
  "Oman": "OM",
  "Pakistan": "PK",
  "Palau": "PW",
  "Palestine": "PS",
  "Panama": "PA",
  "Papua New Guinea": "PG",
  "Paraguay": "PY",
  "Peru": "PE",
  "Philippines": "PH",
  "Poland": "PL",
  "Portugal": "PT",
  "Puerto Rico": "PR",
  "Qatar": "QA",
  "Romania": "RO",
  "Russia": "RU",
  "Rwanda": "RW",
  "Réunion": "RE",
  "Samoa": "WS",
  "San Marino": "SM",
  "São Tomé & Príncipe": "ST",
  "Saudi Arabia": "SA",
  "Senegal": "SN",
  "Serbia": "RS",
  "Seychelles": "SC",
  "Sierra Leone": "SL",
  "Singapore": "SG",
  "Slovakia": "SK",
  "Slovenia": "SI",
  "Solomon Islands": "SB",
  "Somalia": "SO",
  "South Africa": "ZA",
  "South Korea": "KR",
  "South Sudan": "SS",
  "Spain": "ES",
  "Sri Lanka": "LK",
  "Sudan": "SD",
  "Suriname": "SR",
  "Swaziland": "SZ",
  "Sweden": "SE",
  "Switzerland": "CH",
  "Syria": "SY",
  "Taiwan": "TW",
  "Tajikistan": "TJ",
  "Tanzania": "TZ",
  "Thailand": "TH",
  "Timor-Leste": "TL",
  "Togo": "TG",
  "Tokelau": "TK",
  "Tonga": "TO",
  "Trinidad & Tobago": "TT",
  "Tunisia": "TN",
  "Turkey": "TR",
  "Turkmenistan": "TM",
  "Turks & Caicos Islands": "TC",
  "Tuvalu": "TV",
  "Uganda": "UG",
  "Ukraine": "UA",
  "United Arab Emirates": "AE",
  "United Kingdom": "GB",
  "United States": "US",
  "Uruguay": "UY",
  "Uzbekistan": "UZ",
  "Vanuatu": "VU",
  "Vatican City": "VA",
  "Venezuela": "VE",
  "Vietnam": "VN",
  "Yemen": "YE",
  "Zambia": "ZM",
  "Zimbabwe": "ZW",
};

// Deduplicate countries by name (only use first occurrence)
const DEDUPED_COUNTRY_CODES: typeof COUNTRY_CODES = Array.from(
  COUNTRY_CODES.reduce((map, item) => {
    if (!map.has(item.name)) {
      map.set(item.name, item);
    }
    return map;
  }, new Map<string, typeof COUNTRY_CODES[number]>() ).values()
);

export default function SimpleCentered() {
  // Design tokens and variables
  // White to light blue background gradient for hero area
  const gradient =
        'linear-gradient(130deg, #ffffff 0%, #e0f2fe 55%, #b3e5fc 100%)';
  // Button blues
  const lightBlue = '#3b82f6'; // Light blue theme
  const darkBlue = '#1e40af'; // Darker blue for text/contrast

  // Timeout for resetting the callSent UI (ms)
  const checkDuration = 1800;
  // Ref for timeout (avoid multiple/ghost timers)
  const checkTimeout = useRef<NodeJS.Timeout | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [callSent, setCallSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  // Split state: country code and phone
  const [countryCode, setCountryCode] = useState('+62')
  const [showDropdown, setShowDropdown] = useState(false)
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [phone, setPhone] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [dropdownSearch, setDropdownSearch] = useState('');
  const [activeDropdownIdx, setActiveDropdownIdx] = useState<number | null>(null);
  const [language, setLanguage] = useState('en');
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const optionsContainerRef = useRef<HTMLDivElement | null>(null)
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Helper function to format phone number input as per requirements
  function formatPhoneInput(val: string): string {
    // Store exactly what the user types, no formatting/removal
    return val;
  }

  // Filtered country codes by search term if present (substring, case-insensitive, on name or code)
  const filteredCountryCodes = dropdownSearch.trim().length > 0
    ? DEDUPED_COUNTRY_CODES.filter(c => {
        const q = dropdownSearch.trim().toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.code.replace('+', '').includes(q.replace('+', '')) ||
          c.code.includes(q)
        );
      })
    : DEDUPED_COUNTRY_CODES;
  const selectedCountryIdx = filteredCountryCodes.findIndex(c => c.code === countryCode);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
        setDropdownSearch(''); // Clear search on close
      }
    };
    if (showDropdown) {
      window.addEventListener('mousedown', handler);
    }
    return () => {
      window.removeEventListener('mousedown', handler);
    };
  }, [showDropdown]);

  // Keyboard navigation for country select (updates to always highlight first item after filter/search changes)
  useEffect(() => {
    if (!showDropdown) return;
    function handleKey(e: KeyboardEvent) {
      if (!showDropdown) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveDropdownIdx(idx => {
          if (idx === null) return 0;
          return Math.min(filteredCountryCodes.length - 1, idx + 1);
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveDropdownIdx(idx => {
          if (idx === null) return filteredCountryCodes.length - 1;
          return Math.max(0, idx - 1);
        });
      } else if (e.key === 'Enter' && activeDropdownIdx !== null) {
        e.preventDefault();
        const option = filteredCountryCodes[activeDropdownIdx];
        if (option) {
          setCountryCode(option.code);
        }
        setShowDropdown(false);
        setDropdownSearch('');
      } else if (e.key === 'Escape') {
        setShowDropdown(false);
        setDropdownSearch('');
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [showDropdown, filteredCountryCodes, activeDropdownIdx]);

  // On dropdown open or filtered list change, always select first item
  useEffect(() => {
    if (showDropdown) {
      setActiveDropdownIdx(0);
    }
  }, [showDropdown, dropdownSearch, filteredCountryCodes.length]);

  // Scroll into view the currently active dropdown option
  useEffect(() => {
    if (showDropdown && activeDropdownIdx !== null && optionRefs.current[activeDropdownIdx]) {
      optionRefs.current[activeDropdownIdx]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [activeDropdownIdx, showDropdown, filteredCountryCodes]);

  // Use the Retell SDK for making the phone call
  async function handleSendCall() {
    const fullNumber = countryCode + phone.replace(/^0+/, ""); // remove leading 0s
    if (!phone || phone.length < 5) { // basic length check
      setError('Please enter a valid phone number.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const client = new Retell({
        apiKey: 'key_c80bd9c65cc3762a6cb52deb4435',
      });
      const phoneCallResponse = await client.call.createPhoneCall({
        from_number: language === 'id' ? "16266929470" : "+17242426994",
        to_number: fullNumber,
        metadata: {},
      });
      if (phoneCallResponse && phoneCallResponse.agent_id) {
        setCallSent(true);
        setPhone("");
        setError(null);
        // Set/reset timer for feedback
        if (checkTimeout.current) clearTimeout(checkTimeout.current);
        checkTimeout.current = setTimeout(() => setCallSent(false), checkDuration)
      } else {
        setError("Failed to send call. Please check the phone number and try again.");
      }
    } catch (e: any) {
      setError(e?.message || "Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  // On unmount, clear timeout to prevent memory leaks
  useEffect(() => {
    return () => {
      if (checkTimeout.current) clearTimeout(checkTimeout.current);
    };
  }, []);

  return (
    <div
      className="relative min-h-screen h-screen w-screen overflow-hidden"
      style={{background: gradient}}
    >
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="https://www.ant-intl.com/" target="_blank" rel="noopener noreferrer" className="-m-1.5 p-1.5">
              <span className="sr-only">Ant International</span>
              <img
                alt="Ant International x Retell AI"
                src="/ant-retell.png"
                className="h-24 w-auto"
              />
            </a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background p-6 sm:max-w-sm sm:ring-1 sm:ring-border">
            <div className="flex items-center justify-between">
              <a href="https://ant-intl.com" target="_blank" rel="noopener noreferrer" className="-m-1.5 p-1.5">
                <span className="sr-only">Ant International</span>
                <img
                  alt="Ant International x Retell AI"
                  src="/ant-retell.png"
                  className="h-24 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-foreground"
              >
                <span className="sr-only">Close menu</span>
                <X aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-border">
                {/* No menu items */}
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-32 lg:px-8 min-h-screen h-screen flex items-center justify-center">
        <div className="mx-auto max-w-2xl w-full flex flex-col justify-center items-center">
          <div className="text-center flex flex-col items-center w-full">
            {/* Logo above the main title */}
            <img
              src="/aplus-logo.png"
              alt="Ant International Logo"
              className="mx-auto mb-4 w-64 sm:w-80 md:w-96 lg:w-112"
              style={{height: 'auto'}}
            />
            <div className="flex flex-col items-center mb-4">
              <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-blue-900">
                Try Our Live Demo
              </h1>
            </div>
            {/* Place this info on its own line above the input */}
            <div className="flex justify-center w-full">
              <p className="mt-5 text-lg font-medium text-blue-800 sm:text-xl/8 whitespace-nowrap" style={{lineHeight: 1.25}}>
                Enter your phone number below to receive a call from our Alipay+ telesales agent.
              </p>
            </div>
            {/* Add a space here between the sentence and the input */}
            <div className="h-4"></div>
            <div className="flex flex-col items-center justify-center gap-y-4 sm:flex-row sm:gap-x-4 w-full">
              <div className="relative flex items-center">
                <button
                  type="button"
                  className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 text-blue-900 px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
                  style={{ minWidth: 120, cursor: isLoading || callSent ? 'not-allowed' : 'pointer' }}
                  disabled={isLoading || callSent}
                  onClick={() => setShowLanguageDropdown(v => !v)}
                  aria-label="Select language"
                >
                  <span className="flex-1 text-left">
                    {language === 'en' ? 'English' : 'Indonesian'}
                  </span>
                  {/* Down arrow caret (tiny) */}
                  <span aria-hidden="true" style={{fontSize: '0.86em', marginLeft: 8, display: 'flex', alignItems: 'center', color: '#1e40af'}}>
                    {/* SVG caret for crispness */}
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
                      <path d="M2 4l3 3 3-3" stroke="#1e40af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
                {/* Language dropdown menu */}
                {showLanguageDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white shadow-lg rounded-xl border border-blue-200 z-50">
                    <button
                      type="button"
                      className={`flex w-full items-center px-3 py-2 text-blue-900 font-medium hover:bg-blue-100 transition text-left ${language === 'en' ? 'bg-blue-50 font-bold' : ''}`}
                      onClick={() => {
                        setLanguage('en');
                        setShowLanguageDropdown(false);
                      }}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      className={`flex w-full items-center px-3 py-2 text-blue-900 font-medium hover:bg-blue-100 transition text-left ${language === 'id' ? 'bg-blue-50 font-bold' : ''}`}
                      onClick={() => {
                        setLanguage('id');
                        setShowLanguageDropdown(false);
                      }}
                    >
                      Indonesian
                    </button>
                  </div>
                )}
              </div>
              {/* Custom country code + flag dropdown trigger and menu */}
              <div className="relative flex w-full max-w-xs items-center gap-2 bg-white rounded-full px-3 py-3 border-2 border-white shadow-md">
                {/* Trigger pill */}
                <button
                  type="button"
                  ref={triggerRef}
                  tabIndex={0}
                  aria-label="Select country code"
                  className="inline-flex items-center pl-1 pr-2 py-1 rounded-full text-base font-semibold text-blue-900 bg-blue-100 border border-blue-200 select-none focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
                  style={{ minWidth: '70px', cursor: 'pointer', zIndex: 3 }}
                  onClick={() => { setShowDropdown(v => !v); setDropdownSearch('') }}
                  disabled={isLoading || callSent}
                >
                  {/* Down arrow caret (tiny) before + sign */}
                  <span aria-hidden="true" style={{fontSize: '0.86em', marginRight: 3, display: 'flex', alignItems: 'center', color: '#1e40af', marginLeft: 1}}>
                    {/* SVG caret for crispness */}
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
                      <path d="M2 4l3 3 3-3" stroke="#1e40af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {(() => {
                    const selected = COUNTRY_CODES.find(c => c.code === countryCode)
                    if (selected) {
                      const flagCode = COUNTRY_NAME_TO_ISO_CODE[selected.name]
                      return (
                        <>
                          {flagCode ? <ReactCountryFlag countryCode={flagCode} svg style={{ width: 22, height: 16, marginRight: 7, borderRadius: 3, boxShadow: '0 1px 2px #0002' }} aria-label={selected.name + ' flag'} /> : <span className="text-lg font-normal" style={{marginRight:4}}>{selected.flag}</span>}
                          {selected.code}
                        </>
                      );
                    }
                    return countryCode;
                  })()}
                </button>
                {/* Dropdown menu for country selection */}
                {showDropdown && (
                  <div
                    ref={dropdownRef}
                    className={
                      `absolute left-0 bottom-full mb-2 w-[260px] max-h-64 overflow-y-auto bg-white shadow-lg rounded-xl border border-blue-200 z-50 animate-in fade-in duration-100`
                    }
                    tabIndex={-1}
                  >
                    {/* --- SEARCH BAR AT TOP --- */}
                    <div className="p-2 border-b border-blue-100 bg-white sticky top-0 z-10">
                      <input
                        type="text"
                        placeholder="Search country..."
                        value={dropdownSearch}
                        onChange={e => setDropdownSearch(e.target.value)}
                        autoFocus
                        className="block w-full px-3 py-2 rounded-md border border-blue-200 bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium text-blue-900 text-sm placeholder:text-blue-300"
                        style={{ fontFamily: 'inherit' }}
                      />
                    </div>
                    <div
                      ref={optionsContainerRef}
                      className="py-2"
                      style={{ maxHeight: '208px', overflowY: 'auto'}}
                    >
                      {filteredCountryCodes.length ? filteredCountryCodes.map((c, idx) => {
                        const flagCode = COUNTRY_NAME_TO_ISO_CODE[c.name];
                        return (
                        <button
                          type="button"
                          ref={el => { optionRefs.current[idx] = el; }}
                          key={c.code + c.name}
                          className={`flex w-full items-center px-3 py-2 gap-2 text-blue-900 font-medium hover:bg-blue-100 transition text-left ${c.code === countryCode ? 'bg-blue-50 font-bold' : ''} ${idx === activeDropdownIdx ? 'outline outline-2 outline-blue-600 bg-blue-100' : ''}`}
                          onClick={() => {
                            setCountryCode(c.code);
                            setShowDropdown(false);
                            setDropdownSearch('');
                          }}
                          tabIndex={-1}
                        >
                          {flagCode ? <ReactCountryFlag countryCode={flagCode} svg style={{ width: 22, height: 16, marginRight: 7, borderRadius: 3, boxShadow: '0 1px 2px #0002' }} aria-label={c.name + ' flag'} /> : <span className="text-lg" style={{marginRight:3}}>{c.flag}</span>}
                          {c.name} <span className="opacity-60 font-normal ml-auto">({c.code})</span>
                        </button>
                      )}) : (
                        <div className="px-4 py-3 text-center text-blue-800 opacity-60">No matches</div>
                      )}
                    </div>
                  </div>
                )}
                {/* Phone input (shows only user-entered number - never country name/code) */}
                <input
                  type="tel"
                  autoComplete="tel"
                  id="phone-number"
                  name="phone-number"
                  placeholder="Enter your phone number"
                  className="flex-1 outline-none border-none bg-transparent text-blue-800 placeholder:text-blue-400 text-base placeholder:text-sm focus:outline-none focus:border-none focus:ring-0"
                  value={phone}
                  onChange={e => {
                    // Allow only numbers (ignore non-numeric, no spaces, no symbols)
                    const cleaned = e.target.value.replace(/[^0-9]/g, '');
                    setPhone(cleaned);
                  }}
                  onPaste={e => {
                    // Prevent pasting non-numeric
                    const pasted = e.clipboardData.getData('Text');
                    if (/[^0-9]/.test(pasted)) {
                      e.preventDefault();
                      setPhone(pasted.replace(/[^0-9]/g, ''));
                    }
                  }}
                  maxLength={17}
                  disabled={isLoading || callSent}
                  inputMode="numeric"
                  style={{
                    fontSize: '1rem', 
                    background: 'transparent', 
                    zIndex: 1, 
                    letterSpacing: phone ? '0.12em' : undefined,
                  }}
                />
              </div>
              {/* Send Call Button (unchanged) */}
              <button
                type="button"
                className={`w-full max-w-xs rounded-full px-6 py-3.5 text-base font-semibold whitespace-nowrap shadow-lg transition-all duration-300 flex items-center justify-center gap-2 sm:w-auto
                  ${callSent
                    ? 'bg-white text-green-700 scale-100'
                    : 'hover:scale-105'}
                `}
                style={{background: callSent ? '#fff' : lightBlue, color: callSent ? darkBlue : '#fff'}}
                onClick={handleSendCall}
                disabled={!phone || isLoading || callSent}
              >
                <span
                  className={`flex items-center transition-all duration-300 ${callSent ? 'opacity-100 scale-100' : 'opacity-0 scale-75'} absolute`}
                  aria-hidden={!callSent}
                >
                  <Check className="w-6 h-6" strokeWidth={3} color="#014a0f" />
                </span>
                <span
                  className={`transition-all duration-300 ${callSent ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}
                >
                  {isLoading ? 'Sending…' : 'Send Call'}
                </span>
              </button>
            </div>
            {/* Show the actual number being sent to the API, live below */}
            {error && (
              <div className="mt-3 text-center w-full">
                <span className="text-red-500 font-semibold text-base">{error}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}