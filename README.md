# Frontend (Angular) 

This is the frontend part of the project, built with **Angular**, focused on displaying charts, managing visualizations, and handling file uploads. I tried to keep everything structured, reusable, and easy to extend.

## Overview

The frontend includes:

* A reusable chart component using **chart.js** + **ng2-charts**
* Pages for listing visualizations and viewing details
* An upload flow for data files and R scripts
* A small dashboard with demo charts

---

## Features

###  Reusable Chart Component

* Built with ng2-charts (baseChart)
* Supports multiple datasets and `{x, y}` style data
* Handles async-loaded data
* Configurable chart types and options

###  Models / DTOs

The data models match the backend naming (snake_case). Some key ones:

* `ChartDTO`
* `chartEntry`
* `chartPoint`

###  HTTP Service

A dedicated service handles:

* Uploading files
* Searching data
* Fetching chart data
* Normalizing dates to `YYYY-MM-DD`

###  Visualization Pages

Includes:

* Visualization list
* Details page with chart loader
* Date pickers
* Breadcrumbs

###  Upload Flow

Supports uploading:

* `.csv`, `.xlsx`, `.rda`, `.rds`
* `.r` (R scripts)

Also includes:

* Client-side file size limits (100MB)
* File list, pagination
* Reactive forms
* Success/error messages

###  Styling

Updated LESS files to make the layout responsive and keep charts fitting nicely on the page.

---

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
ng serve
```

3. Open the app in your browser:

```
http://localhost:4200/
```

---

## Notes

This frontend is designed to stay simple and readable. Most of the logic lives in services and components so pages stay clean.
