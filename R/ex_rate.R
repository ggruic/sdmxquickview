ex_rate <- function() {
  myUrl <- "https://sdw-wsrest.ecb.europa.eu/service/codelist/ECB/CL_EXR_TYPE/latest?detail=full"
  dataset <- rsdmx::readSDMX(myUrl)
  stats <- as.data.frame(dataset)
  list(message = subset(stats, select=c("id", "label.en")))
}
