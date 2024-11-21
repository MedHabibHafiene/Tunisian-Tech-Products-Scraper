import puppeteer from 'puppeteer';
import { alArabiaUrls } from './alArabiaPaths';
import { Site } from '../../models/Product';
import { tunisianet } from './tunisianet';

export const alArabiaScrape = async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        const allProducts: Array<{ id: string, name: string, price: string, imageUrl: string }> = [];

        for (const url of alArabiaUrls) {
            console.log('Navigating to URL:', url);
            try {
                await page.goto(url, { waitUntil: 'load', timeout: 0 });
                console.log('Successfully navigated to:', url);
            } catch (error) {
                console.error('Error navigating to URL:', url, error);
                continue;
            }

            const totalPages = await page.evaluate(() => {
                const pagination = document.querySelector('.page-list');
                if (pagination) {
                    const pages = Array.from(pagination.querySelectorAll('li a')).map(a => {
                        const href = (a as HTMLAnchorElement).href;
                        const pageNumber = new URL(href).searchParams.get('page');
                        return pageNumber ? parseInt(pageNumber, 10) : 1;
                    });
                    return Math.max(...pages);
                }
                return 1;
            });

            for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
                try {
                    await page.goto(`${url}?page=${pageNumber}`, { waitUntil: 'load', timeout: 0 });
                    await page.waitForSelector('.product-miniature', { timeout: 0 });

                    let parts = url.split('/');
                    let categoryWithPrefix = parts[parts.length - 1];
                    let productCategory = categoryWithPrefix.split('-').slice(1).join('-');
                    const products = await page.evaluate((category: string) => {
                        return Array.from(document.querySelectorAll('.product-miniature')).map(product => {
                            const titleElement = product.querySelector('.product-title a') as HTMLAnchorElement;
                            const priceElement = product.querySelector('.price span.money') as HTMLSpanElement;
                            const imageElement = product.querySelector('.product-thumbnail img') as HTMLImageElement;
                            const id = (product as HTMLElement).getAttribute('data-id-product') || 'No ID available';
                            const link = titleElement ? titleElement.href : '';
                            const name = titleElement ? titleElement.innerText.trim() : 'No name available';
                            const price = priceElement ? priceElement.innerText.trim() : 'No price available';
                            const imageUrl = imageElement ? imageElement.getAttribute('data-full-size-image-url') || '' : 'No image available';
                            const descriptionMeta = document.querySelector('meta[itemprop="description"]');
                            const description = descriptionMeta ? descriptionMeta.getAttribute('content') || '' : 'No description available';
                            return { id, category, name, price, imageUrl, description, link, from: "www.alarabia.com.tn" };
                        });
                    }, productCategory);

                    allProducts.push(...products);
                } catch (error) {
                    console.error(`Failed to load page ${pageNumber}:`, error);
                    continue;
                }
            }
        }

        if (allProducts.length > 0) {
            await Site.deleteOne({ siteName: 'alarabia' });
            const scrappedData = new Site({
                siteName: 'alarabia',
                products: allProducts,
                total: allProducts.length
            });
            await scrappedData.save();
            console.log("Scraping successful, new data saved to MongoDB.");
        }

        console.log("Finished :)");
        return "data from alarabia are scrapped successfully";

    } catch (error) {
        console.error('An error occurred while scraping:', error);
        return [];
    } finally {
        await browser.close();
    }
};

export const category = async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto('https://www.alarabia.com.tn', { waitUntil: 'networkidle2' });

        await page.waitForSelector('.menu-content.top-menu', { timeout: 0 });

        const menuUrls = await page.evaluate(() => {
            const links = Array.from(document.querySelectorAll('.menu-content.top-menu a')) as HTMLAnchorElement[];

            const urls = links.map(link => link.href);

            return urls.filter(url => url.startsWith('https://www.alarabia.com.tn/'));
        });

        return menuUrls;
    } catch (error) {
        console.error('An error occurred while scraping:', error);
        return []; // Return empty array in case of error
    } finally {
        await browser.close();
    }
};


interface Product {
    id: string;
    category: string;
    name: string;
    price: string;
    imageUrl: string;
    link: string;
    description: string;
    from: string;
}

export const tunisianetScrape = async () => {
    console.log("Scrape begins");

    const products: Product[] = [];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (const [baseUrl, totalPages] of Object.entries(tunisianet)) {
        const categoryMatch = baseUrl.match(/\/(\d+)-(.*)/);
        const category = categoryMatch ? categoryMatch[2] : 'unknown-category';

        for (let i = 1; i <= totalPages; i++) {
            const url = `${baseUrl}?page=${i}`;
            await page.goto(url, { waitUntil: 'load', timeout: 0 });
            console.log(url);

            const pageProducts = await page.evaluate((category) => {
                const productList: Product[] = [];
                document.querySelectorAll('.products .item-product').forEach(item => {
                    const id = (item.querySelector('article') as HTMLElement)?.getAttribute('data-id-product') || '';
                    const name = (item.querySelector('.product-title a') as HTMLElement)?.innerText || '';
                    const price = (item.querySelector('.product-price-and-shipping .price') as HTMLElement)?.innerText || '';
                    const imageUrl = (item.querySelector('.product-thumbnail img') as HTMLImageElement)?.getAttribute('src') || '';
                    const link = (item.querySelector('.product-title a') as HTMLAnchorElement)?.getAttribute('href') || '';
                    const description = (item.querySelector('.product-description') as HTMLElement)?.innerText || '';

                    productList.push({
                        id,
                        category,
                        name,
                        price,
                        imageUrl,
                        link,
                        description,
                        from: "www.tunisianet.com.tn"
                    });
                });

                return productList;
            }, category);

            products.push(...pageProducts);
        }
    }

    await browser.close();

    if (products.length > 0) {
        await Site.deleteOne({ siteName: 'tunisianet' });
        const scrappedData = new Site({
            siteName: 'tunisianet',
            products: products,
            total: products.length
        });
        await scrappedData.save();
        console.log("Scraping successful, new data saved to MongoDB.");
    }

    return "Data from tunisianet are scraped successfully";
}