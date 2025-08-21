import React, { useState, useEffect } from 'react';
import { fetchClinics, Clinic } from '../../../lib/api';
import styles from './RecommendedTypes.module.css';

interface ClinicType {
  type: string;
  count: number;
  clinics: Clinic[];
}

const RecommendedTypes: React.FC = () => {
  const [clinicTypes, setClinicTypes] = useState<ClinicType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadClinics = async () => {
      try {
        setLoading(true);
        const clinics = await fetchClinics();
        
        // Group clinics by type
        const typeMap = new Map<string, Clinic[]>();
        
        clinics.forEach(clinic => {
          const type = clinic.type;
          if (!typeMap.has(type)) {
            typeMap.set(type, []);
          }
          typeMap.get(type)!.push(clinic);
        });

        // Convert to array format
        const types: ClinicType[] = Array.from(typeMap.entries()).map(([type, clinicList]) => ({
          type,
          count: clinicList.length,
          clinics: clinicList
        }));

        setClinicTypes(types);
      } catch (err) {
        setError('Klinikalar yuklanmadi');
        console.error('Error loading clinics:', err);
      } finally {
        setLoading(false);
      }
    };

    loadClinics();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Yuklanmoqda...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  const getTypeDisplayName = (type: string): string => {
    switch (type) {
      case 'PUBLIC':
        return 'Davlat klinikalari';
      case 'PRIVATE':
        return 'Xususiy klinikalar';
      default:
        return type;
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Tibbiyot muassasalarining turlari</h2>
      <div className={styles.grid}>
        {clinicTypes.map((clinicType) => (
          <div key={clinicType.type} className={styles.typeCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.typeName}>{getTypeDisplayName(clinicType.type)}</h3>
              <span className={styles.count}>{clinicType.count} ta klinika</span>
            </div>
            <div className={styles.clinicsList}>
              {clinicType.clinics.slice(0, 3).map((clinic) => (
                <div key={clinic.id} className={styles.clinicItem}>
                  <img 
                    src={clinic.logo_url} 
                    alt={clinic.name}
                    className={styles.clinicLogo}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-clinic.png';
                    }}
                  />
                  <div className={styles.clinicInfo}>
                    <h4 className={styles.clinicName}>{clinic.name}</h4>
                    <p className={styles.clinicAddress}>{clinic.address}</p>
                    <p className={styles.clinicRegion}>{clinic.Region?.name}</p>
                  </div>
                </div>
              ))}
              {clinicType.count > 3 && (
                <div className={styles.moreButton}>
                  +{clinicType.count - 3} ta ko'proq
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedTypes;