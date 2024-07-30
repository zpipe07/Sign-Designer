"use client"

import { useState } from "react"
import Image from "next/image"
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material"

import { HeroContainer } from "@/src/components/HeroContainer"

const TabPanel: React.FC<{
  children: React.ReactNode
  tabValue: number
  index: number
}> = ({ children, tabValue, index }) => {
  return (
    <Box hidden={tabValue !== index} sx={{ paddingTop: 2 }}>
      {children}
    </Box>
  )
}

export const SignDetails: React.FC = () => {
  const [tabValue, setTabValue] = useState(0)

  const handleChange = (
    _event: React.SyntheticEvent,
    newValue: number,
  ) => {
    setTabValue(newValue)
  }

  return (
    <HeroContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Tabs value={tabValue} onChange={handleChange}>
            <Tab label="Specs" />
            <Tab label="Description" />
          </Tabs>

          <TabPanel tabValue={tabValue} index={0}>
            <Typography variant="h3">Product Specs</Typography>
            <Box component="ul">
              <Box component="li">Dimensions</Box>
              <Box component="ul">
                <Box component="li">
                  Large: 15&quot; x 11&quot; x 1&quot;
                </Box>
                <Box component="li">
                  Medium: 15&quot; x 9&quot; x 1&quot;
                </Box>
                <Box component="li">
                  Small: 15&quot; x 7.5&quot; x 1&quot;
                </Box>
                <Box component="li">
                  Extra small: 15&quot; x 3.5&quot; x 1&quot;
                </Box>
              </Box>
              <Box component="li">Weather proof</Box>
              <Box component="li">UV proof</Box>
              <Box component="li">CNC machined</Box>
              <Box component="li">Made of HDPE</Box>
            </Box>
          </TabPanel>

          <TabPanel tabValue={tabValue} index={1}>
            <Typography variant="h3">Product Description</Typography>
            <Typography marginBottom={1}>
              Transform your home with our beautifully crafted custom
              signs. Each sign is meticulously designed to reflect
              your unique style and personality, adding a touch of
              elegance and charm to your residence. Our signs are made
              from high-quality materials, ensuring durability and
              longevity, even in the harshest weather conditions.
            </Typography>

            <Typography variant="h5">Key Features:</Typography>

            <Box component="ul">
              <Box component="li">
                <Typography>
                  Personalized Designs: Tailor your sign to match your
                  home&apos;s aesthetic with our wide range of
                  customization options.
                </Typography>
              </Box>

              <Box component="li">
                <Typography>
                  Premium Materials: Crafted from durable,
                  weather-resistant materials to withstand the
                  elements.
                </Typography>
              </Box>

              <Box component="li">
                <Typography>
                  Premium Materials: Crafted from durable,
                  weather-resistant materials to withstand the
                  elements.
                </Typography>
              </Box>

              <Box component="li">
                <Typography>
                  Handcrafted Quality: Each sign is carefully made by
                  skilled artisans, ensuring a unique and high-quality
                  product.
                </Typography>
              </Box>

              <Box component="li">
                <Typography>
                  Easy Installation: Comes with all necessary hardware
                  for quick and easy installation.
                </Typography>
              </Box>
            </Box>

            <Typography>
              Enhance your home&apos;s curb appeal with a custom sign
              that truly stands out. Whether you&apos;re looking for a
              house number, nameplate, or a decorative piece, our
              signs are the perfect addition to any home.
            </Typography>
          </TabPanel>

          {/* <Typography variant="h3" marginBottom={2}>
            Details
          </Typography>

          <Typography variant="subtitle1">
            Lorem ipsum dolor sit amet Consectetur adipiscing
          </Typography>

          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor.
          </Typography> */}
        </Grid>

        <Grid item xs={12} sm={6}>
          <Image
            src="/images/product/IMG_5837.jpg"
            alt=""
            style={{
              width: "100%",
              height: "auto",
            }}
            width={500}
            height={300}
          />
        </Grid>
      </Grid>
    </HeroContainer>
  )
}
