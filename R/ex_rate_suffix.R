ex_rate_suffix <- function() {
  myUrl <- "https://sdw-wsrest.ecb.europa.eu/service/codelist/ECB/CL_EXR_SUFFIX/latest?detail=full"
  dataset <- rsdmx::readSDMX(myUrl)
  stats <- as.data.frame(dataset)
  list(message = subset(stats, select=c("id", "label.en")))
}
