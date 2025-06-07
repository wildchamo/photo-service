-- Migration number: 0001 	 2025-06-06T15:11:40.744Z
CREATE TABLE images_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
	slug TEXT NOT NULL UNIQUE,
    display_name TEXT,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO images_categories (slug, display_name) VALUES
('nature', 'Nature'),
('city', 'City');

CREATE TABLE images (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	category_id INTEGER NOT NULL,
	user_id INTEGER NOT NULL,
	image_url TEXT NOT NULL,
	title TEXT NOT NULL,
	format TEXT NOT NULL,
	resolution TEXT NOT NULL,
	file_size_bytes INTEGER NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (category_id) REFERENCES images_categories (id)
);

CREATE INDEX IF NOT EXISTS idx_images_created_at ON images(created_at);

INSERT INTO images (category_id, user_id, image_url, title, format, resolution, file_size_bytes) VALUES
(1, 1, 'https://example.com/image1.jpg', 'Image 1', 'jpg', '1024x768', 1024),
(2, 1, 'https://example.com/image2.jpg', 'Image 2', 'jpg', '1024x768', 1024),
(1, 2, 'https://example.com/image3.jpg', 'Image 3', 'png', '800x600', 800),
(2, 2, 'https://example.com/image4.jpg', 'Image 4', 'jpg', '1280x720', 2048),
(1, 3, 'https://example.com/image5.jpg', 'Image 5', 'jpeg', '1920x1080', 3072),
(2, 3, 'https://example.com/image6.jpg', 'Image 6', 'png', '640x480', 512),
(1, 1, 'https://example.com/image7.jpg', 'Image 7', 'jpg', '2560x1440', 4096),
(2, 1, 'https://example.com/image8.jpg', 'Image 8', 'jpeg', '3840x2160', 8192);
