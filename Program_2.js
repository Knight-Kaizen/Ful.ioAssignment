/**
 * WAP to get the Social Links, Email & Contacts details of a website on user input.
 */

const axios = require('axios');
const cheerio = require('cheerio');

const websiteUrl = 'https://ful.io';

async function scrapeWebsite(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Extract social links
    const socialLinks = [];
    $('a').each((index, element) => {
      const href = $(element).attr('href');
      if (href && (href.includes('facebook.com') || href.includes('twitter.com') || href.includes('linkedin.com'))) {
        socialLinks.push(href);
      }
    });

    // Extract email
    const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}/g;
    const emailMatches = html.match(emailRegex);
    const email = emailMatches ? emailMatches[0] : 'Email not found';

    // Extract contact number
    const contactRegex = /(\+?1-?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    const contactMatches = html.match(contactRegex) || [];
    const formattedContacts = contactMatches.map((contact) => {
      const digitsOnly = contact.replace(/[^\d]/g, ''); 
      return `+1 ${digitsOnly.slice(0, 3)} ${digitsOnly.slice(3, 6)} ${digitsOnly.slice(6)}`;
    });

    return { socialLinks, email, contacts: formattedContacts };
  } catch (error) {
    console.error('Error scraping website:', error);
    return null;
  }
}

const getContacts = async () => {
  const scrapedData = await scrapeWebsite(websiteUrl);
  if (scrapedData) {
    console.log('Social Links:', scrapedData.socialLinks);
    console.log('Email:', scrapedData.email);
    console.log('Contacts:', scrapedData.contacts);
  }
};

getContacts();
