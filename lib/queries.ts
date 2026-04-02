// Tagged template that returns the query string
const gql = (strings: TemplateStringsArray, ...values: any[]) => strings.reduce((a, s, i) => a + s + (values[i] || ''), '')

export const GET_HOMEPAGE_DATA = gql`
  query GetHomepageData {
    nodeHomepages(first: 1) {
      nodes {
        id
        title
        path
        heroTitle
        heroSubtitle
        heroDescription { processed }
        statsItems { ... on ParagraphStatItem { id number label } }
        featuredItemsTitle
        ctaTitle
        ctaDescription { processed }
        ctaPrimary
        ctaSecondary
      }
    }
  }
`

export const GET_NODE_BY_PATH = gql`
  query GetNodeByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodePage {
            __typename
            id
            title
            body {
              processed
            }
          }
          ... on NodeHomepage {
            __typename
            id
            title
            heroTitle
            heroSubtitle
            heroDescription {
              processed
            }
            statsItems {
              ... on ParagraphStatItem {
                id
                number
                label
              }
            }
            featuredItemsTitle
            ctaTitle
            ctaDescription {
              processed
            }
            ctaPrimary
            ctaSecondary
          }
          ... on NodeService {
            __typename
            id
            title
            path
            body { processed }
            summary
            priceRange
            estimatedTime
            warrantyInfo
            image { url alt width height }
          }
          ... on NodeTeamMember {
            __typename
            id
            title
            path
            body { processed }
            position
            certifications
            yearsExperience
            specialties
            photo { url alt width height }
          }
          ... on NodeCoupon {
            __typename
            id
            title
            path
            body { processed }
            discountAmount
            couponCode
            validUntil { timestamp }
            terms { processed }
            image { url alt width height }
          }
        }
      }
    }
  }
`

export const GET_SERVICES = gql`
  query GetServices($first: Int = 10) {
    nodeServices(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        created { timestamp }
        ... on NodeService {
          body { processed summary }
          summary
          priceRange
          estimatedTime
          warrantyInfo
          image { url alt width height variations(styles: [LARGE, MEDIUM, THUMBNAIL]) { name url width height } }
        }
      }
    }
  }
`

export const GET_SERVICE_BY_PATH = gql`
  query GetServiceByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeService {
            id
            title
            path
            body { processed summary }
            summary
            priceRange
            estimatedTime
            warrantyInfo
            image { url alt width height variations(styles: [LARGE, MEDIUM, THUMBNAIL]) { name url width height } }
          }
        }
      }
    }
  }
`

export const GET_TEAM_MEMBERS = gql`
  query GetTeamMembers($first: Int = 10) {
    nodeTeamMembers(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        created { timestamp }
        ... on NodeTeamMember {
          body { processed summary }
          position
          certifications
          yearsExperience
          specialties
          photo { url alt width height variations(styles: [LARGE, MEDIUM, THUMBNAIL]) { name url width height } }
        }
      }
    }
  }
`

export const GET_TEAM_MEMBER_BY_PATH = gql`
  query GetTeamMemberByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeTeamMember {
            id
            title
            path
            body { processed summary }
            position
            certifications
            yearsExperience
            specialties
            photo { url alt width height variations(styles: [LARGE, MEDIUM, THUMBNAIL]) { name url width height } }
          }
        }
      }
    }
  }
`

export const GET_COUPONS = gql`
  query GetCoupons($first: Int = 10) {
    nodeCoupons(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        created { timestamp }
        ... on NodeCoupon {
          body { processed summary }
          discountAmount
          couponCode
          validUntil { timestamp }
          terms { processed }
          image { url alt width height variations(styles: [LARGE, MEDIUM, THUMBNAIL]) { name url width height } }
        }
      }
    }
  }
`

export const GET_COUPON_BY_PATH = gql`
  query GetCouponByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeCoupon {
            id
            title
            path
            body { processed summary }
            discountAmount
            couponCode
            validUntil { timestamp }
            terms { processed }
            image { url alt width height variations(styles: [LARGE, MEDIUM, THUMBNAIL]) { name url width height } }
          }
        }
      }
    }
  }
`
